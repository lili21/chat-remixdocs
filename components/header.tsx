import * as React from 'react'
import { Github } from 'lucide-react'
import { RemixLight } from './ui/icons'
import { ShareButton } from './share'

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <a target="_blank" href="https://remix.run" rel="noopener noreferrer">
        <RemixLight />
      </a>
      <div className="flex items-center gap-4">
        <ShareButton />
        <a
          target="_blank"
          href="https://github.com/lili21/chat-remixdocs"
          rel="noopener noreferrer"
        >
          <Github size={28} />
        </a>
      </div>
    </header>
  )
}
