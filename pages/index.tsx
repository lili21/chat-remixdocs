import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
// import { SearchDialog } from '@/components/SearchDialog'
const inter = Inter({ subsets: ['latin'] })
import Chat from '@/components/Chat'

export default function Home() {
  return (
    <>
      <Head>
        <title>Chat with Remix docs</title>
        <meta
          name="description"
          content="chat with remix docs"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* <div className={styles.center}> */}
        {/* <SearchDialog /> */}
        {/* </div> */}
        <Chat />
      </main>
    </>
  )
}
