import { Message } from 'ai'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import toast from 'react-hot-toast'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

let _messages: Message[] = []

export function setMessages(messages: Message[]) {
  _messages = messages
}

export function getMessages() {
  return _messages
}

export function copyShareLink(id: string) {
  const url = new URL(window.location.href)
  url.pathname = `/share/${id}`
  navigator.clipboard.writeText(url.toString())
  toast.success('Share link copied to clipboard')
}
