import type { Metadata } from 'next'
import React from 'react'
import Header from '@/widgets/header/header'
import Footer from '@/widgets/footer/footer'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import ClientProvider from '@/app/clientProvider'
import { PublicEnvScript } from 'next-runtime-env'

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
      <head>
        <PublicEnvScript />
      </head>
      <body>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ClientProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
