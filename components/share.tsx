'use client'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { shareChat } from '@/app/actions'
import { copyShareLink, getMessages } from '@/lib/utils'
import { Share } from 'lucide-react'
import { nanoid } from '@/lib/utils'
import { useParams } from 'next/navigation'

export function ShareButton() {
  const params = useParams()
  if (params?.id) {
    return null
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={async () => {
              const messages = getMessages()
              if (messages.length) {
                const id = nanoid()
                await shareChat(id, Date.now(), messages)
                copyShareLink(id)
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
