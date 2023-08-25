'use client'

import { useChat } from 'ai/react'
import ChatMessage from './ChatMessage'
import { Input } from './ui/input'
import { Send } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function Chat({ api }: { api: string }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({ api })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const resiveObserve = new ResizeObserver((entries) => {
      document.body.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    })
    resiveObserve.observe(ref.current)
    return () => resiveObserve.disconnect()
  }, [])

  return (
    <div ref={ref} className="w-full flex-1 relative">
      {messages.map((m) => (
        <div className="flex items-start gap-4 mb-4" key={m.id}>
          <ChatMessage m={m} />
        </div>
      ))}

      <form
        onSubmit={handleSubmit}
        className="fixed"
        style={{ width: '640px', left: '50%', bottom: '20px', transform: 'translateX(-50%)' }}
      >
        <div className="relative">
          <Input
            placeholder="Ask a question about Remix"
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
