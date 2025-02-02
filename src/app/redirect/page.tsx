'use client'

import { useSearchParams } from 'next/navigation'
export default function RedirectData() {
  const searchParams = useSearchParams()

  const tokenParam = searchParams!.get('token')
  const searchTextParam = searchParams!.get('searchText')
  return (
    <>
      Token: {tokenParam} <br />
      SearchText: {searchTextParam}
    </>
  )
}
