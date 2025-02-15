import type { Metadata } from 'next'
import * as React from 'react'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

export const metadata: Metadata = {
  title: 'SparkLens',
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
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <Header />
          <main>{children}</main>
          <Footer />
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
