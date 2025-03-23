import type { Metadata } from 'next'
import * as React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import Footer from '@/widgets/footer'
import './global.css'
import Header from '@/widgets/header'

export const metadata: Metadata = {
  title: 'SparkLens',
  description: '아이디어 분석 툴',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
