import { kv } from '@vercel/kv'
import { Message, nanoid } from 'ai'

interface Chat {
  createAt: number
  id: string
  messages: Message[]
}

export async function shareChat(messages: Message[]) {
  const id = nanoid()

  const payload = {
    id,
    createAt: Date.now,
    messages,
  }

  await kv.hmset(`chat:${id}`, payload)

  return payload
}
