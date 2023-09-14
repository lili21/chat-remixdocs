'use client'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { shareChat } from '@/app/actions'
import { copyShareLink, getMessages } from '@/lib/utils'
import { Share } from 'lucide-react'
import { nanoid } from '@/lib/utils'

export function ShareButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={async () => {
              if (window.location.pathname.includes('share')) {
                copyShareLink(window.location.href)
              } else {
                const messages = getMessages()
                if (messages.length) {
                  const id = nanoid()
                  await shareChat(id, Date.now(), messages)
                  copyShareLink(id)
                }
              }
            }}
            variant="ghost"
          >
            <Share />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Share chat</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
