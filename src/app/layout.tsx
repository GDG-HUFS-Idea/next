import MySessionProvider from '@/features/auth/mySessionProvider'
import type { Metadata } from 'next'
import * as React from 'react'

export const metadata: Metadata = {
  title: 'Sparklens',
  description: '아이디어 분석 툴',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <MySessionProvider>{children}</MySessionProvider>
      </body>
    </html>
  )
}
