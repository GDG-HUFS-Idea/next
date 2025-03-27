import type { Metadata } from 'next'
import * as React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import Footer from '@/widgets/footer'
import './global.css'
import ClientSidebar from '@/pages/clientSidebar'
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
  const user = {
    name: 'Andrew Smith',
    avatar: '/avatar.png',
  }
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Header />
          <ClientSidebar user={user}>
            <main>{children}</main>
            <Footer />
          </ClientSidebar>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
