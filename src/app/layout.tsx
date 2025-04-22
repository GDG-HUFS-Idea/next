import type { Metadata } from 'next'
import * as React from 'react'
import Header from '@/widgets/header/header'
import Footer from '@/widgets/footer/footer'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import QueryProvider from '@/conponents/queryProvider'

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

          <QueryProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </QueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
