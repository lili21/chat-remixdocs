import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { codeBlock, oneLine } from 'common-tags'
import GPT3Tokenizer from 'gpt3-tokenizer'
import { OpenAIStream, StreamingTextResponse } from 'ai'
// import {
//   Configuration,
//   OpenAIApi,
//   CreateModerationResponse,
//   CreateEmbeddingResponse,
//   ChatCompletionRequestMessage,
// } from 'openai-edge'
// import { OpenAIStream, StreamingTextResponse } from 'ai'
import { ApplicationError, UserError } from '@/lib/errors'
import OpenAI from 'openai'

const openAiKey = process.env.OPENAI_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY


const openai = new OpenAI({
  apiKey: openAiKey,
})

const supabaseClient = createClient(supabaseUrl, supabaseServiceKey)

// export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    if (!openAiKey) {
      throw new ApplicationError('Missing environment variable OPENAI_KEY')
    }

    if (!supabaseUrl) {
      throw new ApplicationError('Missing environment variable SUPABASE_URL')
    }

    if (!supabaseServiceKey) {
      throw new ApplicationError('Missing environment variable SUPABASE_SERVICE_ROLE_KEY')
    }
    const requestData = await req.json()

    console.log('----- request data ---', requestData)

    if (!requestData) {
      throw new UserError('Missing request data')
    }

    const { messages } = requestData;

    const query = messages[messages.length - 1].content;

    // Moderate the content to comply with OpenAI T&C
    const sanitizedQuery = query.trim()
    // const moderationResponse = await openai
    //   .moderations.create({ input: sanitizedQuery })

    // const [results] = moderationResponse.results

    // if (results.flagged) {
    //   throw new UserError('Flagged content', {
    //     flagged: true,
    //     categories: results.categories,
    //   })
    // }

    // Create embedding from query
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: sanitizedQuery.replaceAll('\n', ' '),
    })

    const {
      data: [{ embedding }],
    } = embeddingResponse

    const { error: matchError, data: pageSections } = await supabaseClient.rpc(
      'match_page_sections',
      {
        embedding,
        match_threshold: 0.78,
        match_count: 10,
        min_content_length: 50,
      }
    )

    if (matchError) {
      throw new ApplicationError('Failed to match page sections', matchError)
    }

    const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })
    let tokenCount = 0
    let contextText = ''

    for (let i = 0; i < pageSections.length; i++) {
      const pageSection = pageSections[i]
      const content = pageSection.content
      const encoded = tokenizer.encode(content)
      tokenCount += encoded.text.length

      if (tokenCount >= 1500) {
        break
      }

      contextText += `${content.trim()}\n---\n`
    }

    const prompt = codeBlock`
      ${oneLine`
        You are a very enthusiastic Remix representative who loves
        to help people! Given the following sections from the Remix
        documentation, answer the question using only that information,
        outputted in markdown format. If you are unsure and the answer
        is not explicitly written in the documentation, say
        "Sorry, I don't know how to help with that."
      `}

      Context sections:
      ${contextText}

      Question: """
      ${sanitizedQuery}
      """

      Answer as markdown (including related code snippets if available):
    `

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages.concat({ role: 'user', content: prompt }),
      // max_tokens: 512,
      temperature: 0,
      stream: true,
    })


    // const encoder = new TextEncoder()

    // const stream = new ReadableStream({
    //   async start(controller) {
    //     for await (const part of response) {
    //       const content = part.choices[0].delta.content
    //       const _content = encoder.encode(content!)
    //       controller.enqueue(_content)
    //     }
    //   },
    // })

    // return new Response(stream, { status: 200 })
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response)
    // Respond with the stream
    return new StreamingTextResponse(stream)
  } catch (err: unknown) {
    if (err instanceof UserError) {
      return new Response(
        JSON.stringify({
          error: err.message,
          data: err.data,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    } else if (err instanceof ApplicationError) {
      // Print out application errors with their additional data
      console.error(`${err.message}: ${JSON.stringify(err.data)}`)
    } else {
      // Print out unexpected errors as is to help with debugging
      console.error(err)
    }

    // TODO: include more response info in debug environments
    return new Response(
      JSON.stringify({
        error: 'There was an error processing your request',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
