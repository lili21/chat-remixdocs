'use server'

import { kv } from '@vercel/kv'
import { Message } from 'ai'

export async function getChats() {
  const result = await kv.scan(0, { type: 'hash', count: 10 })

  return result
}

export async function getChat(id: string) {
  const result = await kv.hgetall<{ messages: Message[] }>(`chat:${id}`)
  return result
}

export async function shareChat(id: string, createAt: number, messages: Message[]) {
  const payload = {
    id,
    createAt,
    messages,
  }

  await kv.hmset(`chat:${id}`, payload)

  return payload
}
