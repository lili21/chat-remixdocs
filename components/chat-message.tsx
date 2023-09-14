
import Image from 'next/image'
import type { Message } from 'ai'

import { cn } from '@/lib/utils'
import { IconUser } from './ui/icons'
import { Content } from './content'

export function ChatMessage({ message, ...props }: { message: Message }) {
  return (
    <div className={cn('group relative mb-4 flex items-start md:-ml-12')} {...props}>
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          message.role === 'user' ? 'bg-background' : 'bg-primary text-primary-foreground'
        )}
      >
        {message.role === 'user' ? (
          <IconUser />
        ) : (
          <Image src="/remix.svg" width="24" height="24" alt="remix logo" />
        )}
      </div>
      <Content>{message.content}</Content>
    </div>
  )
}
