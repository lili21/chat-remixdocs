import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import Header from '@/components/header'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Chat With Remix Docs',
  description: 'Ask question about Remix',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn('font-sans antialiased', fontSans.variable, fontMono.variable)}>
        {/* <Toaster /> */}
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex flex-col flex-1 bg-muted/50">{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
