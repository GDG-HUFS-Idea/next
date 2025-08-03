import type { Metadata } from 'next'
import React from 'react'
import Header from '@/widgets/header/header'
import Footer from '@/widgets/footer/footer'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import ClientProvider from '@/app/clientProvider'
import Script from 'next/script'

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__ENV = {
                NEXT_PUBLIC_API_URL: '${process.env.NEXT_PUBLIC_API_URL}',
                NEXT_PUBLIC_FRONTEND_URL: '${process.env.NEXT_PUBLIC_FRONTEND_URL}'
              }
            `,
          }}
        />
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
