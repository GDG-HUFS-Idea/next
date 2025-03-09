'use client'

import { useAuthStore, useTermAuthStore } from '@/shared/store/authStore'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RedirectPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const termAccount = useTermAuthStore((state) => state.setAccount)
  const account = useAuthStore((store) => store.setUser)
  const code = searchParams.get('code') // URL에서 code 가져오기
  const { data, error, isLoading } = useQuery({
    queryKey: ['auth', 'oauth', 'callback', code], // queryKey에 code 포함
    queryFn: async () => {
      if (!code) return null // code가 없으면 API 요청 안 함
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/oauth/callback?code=${code}`
      )
      return res.json()
    },
    enabled: !!code, // code가 있을 때만 실행
  })
  useEffect(() => {
    if (!data?.has_account) {
      termAccount(data)
      router.push('/terms')
    } else {
      account(data)
      router.push('/idea/input')
    }
  }, [data, router])

  if (isLoading) return <p>로딩 중...</p>
  if (error) return <p>에러 발생: {error.message}</p>

  return (
    <>
      {!data?.has_account || <h1>기존 회원 페이지로 이동</h1>}
      {data?.has_account || <h1>신규 회원 약관 동의 페이지로 이동</h1>}
    </>
  )
}
