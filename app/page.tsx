import '@/styles/globals.css'

import styles from '@/styles/Home.module.css'
import Chat from '@/components/Chat'
import { Github } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chat With Remix Docs',
  description: 'Ask question about Remix',
  viewport: 'width=device-width, initial-scale=1',
}

export default function Home() {
  const api = process.env.NODE_ENV === 'development' ? '/api/chat-dev' : '/api/chat'
  return (
    <main className={styles.main}>
      <a
        className="fixed top-6 right-6"
        href="https://github.com/lili21/chat-remixdocs"
        target="_blank"
      >
        <Github size="30" stroke="#4169E1" />
      </a>
      <Chat api={api} />
    </main>
  )
}
