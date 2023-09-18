import { Chat } from '@/components/chat'

export default function Home() {
  const api = process.env.NODE_ENV === 'development' ? '/api/chat-dev' : '/api/chat'
  return <Chat api={api} />
}
