'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Header from './header'

export default function RootHeader() {
  const pathname = usePathname() ?? ''

  return !pathname.startsWith('/idea') ? <Header open={false} /> : null
}
