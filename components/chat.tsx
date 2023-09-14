'use client'

import { useChat } from 'ai/react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { EmptyScreen } from './empty-screen'
import { ChatList } from './chat-list'
// import { ChatScrollAnchor } from './chat-scroll-anchor'
import { IconStop, IconRefresh } from './ui/icons'
import { useEffect, useRef } from 'react'
import { setMessages } from '@/lib/utils'

export function Chat({ api }: { api: string }) {
  const { messages, input, handleInputChange, append, handleSubmit, isLoading, stop, reload } =
    useChat({
      api,
    })

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const resizeObserve = new ResizeObserver((entries) => {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        })
      }, 500)
    })
    resizeObserve.observe(ref.current)
    return () => resizeObserve.disconnect()
  }, [])

  useEffect(() => {
    if (!isLoading && messages.length) {
      setMessages(messages)
    }
  }, [isLoading, messages])

  return (
    <>
      <div ref={ref} className="pb-[150px] pt-4 md:pt-10">
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            {/* <ChatScrollAnchor trackVisibility={isLoading} /> */}
          </>
        ) : (
          <EmptyScreen
            setInput={(v) => {
              append({
                role: 'user',
                content: v,
              })
            }}
          />
        )}
      </div>

      <form
        method="post"
        onSubmit={handleSubmit}
        className="fixed bottom-12"
        style={{ width: '640px', left: '50%', transform: 'translateX(-50%)' }}
      >
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button variant="outline" onClick={() => stop()} className="bg-background mb-2">
              <IconStop className="mr-2" />
              Stop
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button variant="outline" onClick={() => reload()} className="bg-background mb-2">
                <IconRefresh className="mr-2" />
                Regenerate
              </Button>
            )
          )}
        </div>

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
    </>
  )
}
