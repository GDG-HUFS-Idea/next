import type { Metadata } from 'next'
import * as React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import './global.css'
import ClientSidebar from '@/pages/clientSidebar'

export const metadata: Metadata = {
  title: 'SparkLens',
  description: '아이디어 분석 툴',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = {
    name: 'Andrew Smith',
    role: 'admin', // 'user' or 'admin'
    avatar: '/avatar.png',
  }
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ClientSidebar user={user}>
            <Header />
            <main>{children}</main>
            <Footer />
          </ClientSidebar>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
