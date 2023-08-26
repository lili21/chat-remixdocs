import '@/styles/globals.css'

import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Chat from '@/components/Chat'
import { Github } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const api = process.env.NODE_ENV === 'development' ? '/api/chat-dev' : '/api/chat'
  return (
    <>
      <Head>
        <title>Chat with Remix docs</title>
        <meta name="description" content="chat with remix docs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
    </>
  )
}
