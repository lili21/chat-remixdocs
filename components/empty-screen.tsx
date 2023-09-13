// import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
// import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  'How do I handle multiple forms in one route?',
  'How can I have structured data in a form?',
  `What's the difference between CatchBoundary & ErrorBoundary?`,
]

export function EmptyScreen({ setInput }: { setInput: (v: string) => void }) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">Welcome to Chat with Remix!</h1>
        <p className="leading-normal text-muted-foreground">
          You can ask quetion about Remix or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
