import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Header } from '@/components/header'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Chat With Remix',
  description: 'You can ask any question about Remix, powered by AI',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Chat With Remix',
    description: 'An AI powdered chatbot, you can ask any question about Remix',
    images: ['/chat-remix-og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn('font-sans antialiased', fontSans.variable, fontMono.variable)}>
        <Toaster />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex flex-col flex-1 bg-muted/50">{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
