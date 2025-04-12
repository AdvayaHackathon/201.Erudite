import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { UserProvider } from '@/context/user-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HealthVision',
  description: 'Your personal health monitoring platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <UserProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  )
}
