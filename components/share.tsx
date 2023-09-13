'use client'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { shareChat } from '@/app/actions'
import { copyShareLink, getMessages } from '@/lib/utils'
import { Share } from 'lucide-react'

export function ShareButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {
              // const messages = getMessages()
              // if (messages.length) {
              //   const result = await shareChat(messages)
              //   await copyShareLink(result.id)
              //   toast({
              //     title: 'Share link copied to clipboard',
              //   })
              // }
              copyShareLink('12345')
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
