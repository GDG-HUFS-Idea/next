import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Idea demo',
  description: '개발 중',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
