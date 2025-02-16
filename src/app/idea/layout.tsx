import NavigationTab from '@/pages/navigationTab'
import * as React from 'react'

export default function IdeaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <NavigationTab></NavigationTab>
      <main>{children}</main>
    </>
  )
}
