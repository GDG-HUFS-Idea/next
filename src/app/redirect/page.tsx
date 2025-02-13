'use client'

import { useSearchParams } from 'next/navigation'
export default function RedirectData() {
  const searchParams = useSearchParams()

  const tokenParam = searchParams!.get('token')
  return (
    <div>
      Token: {tokenParam} <br />
    </div>
  )
}
