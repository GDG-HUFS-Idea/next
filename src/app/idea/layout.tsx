import NavigationTab from '@/pages/navigationTab'
import { Suspense } from 'react'

export default function InputsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <NavigationTab></NavigationTab>
      </Suspense>
      <main>{children}</main>
    </>
  )
}
