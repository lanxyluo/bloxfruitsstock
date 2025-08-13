import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blox Fruits Stock Monitor',
  description: 'Real-time Blox Fruits stock monitoring and trading platform',
  keywords: 'blox fruits, stock, monitor, trading, roblox',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans">
        {children}
      </body>
    </html>
  )
}


