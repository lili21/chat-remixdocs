'use client'

import { useChat } from 'ai/react'
import Message from './Message.tsx'
import { Input } from './ui/input.tsx'
import { Send } from 'lucide-react'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: process.env.NODE_ENV === 'development' ? '/api/chat-dev' : '/api/chat'
  })

  return (
    <div className="w-full flex-1 relative">
      {messages.map(m => (
        <div className="flex items-start gap-4 mb-4" key={m.id}>
          <Message m={m} />
        </div>
      ))}

      <form onSubmit={handleSubmit} className="fixed bottom-24 left-24 right-24">
        <div className="relative">
          <Input
            placeholder="Ask a question..."
            name="search"
            value={input}
            onChange={handleInputChange}
            className="col-span-3"
          />
          <Send className={`absolute top-3 right-5 h-4 w-4`} />
        </div>
      </form>
    </div>
  )
}
