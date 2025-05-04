import { useGetAuthCallback } from '@/shared/api/redirect/getAuthCallback'
import { useAuthStore, useTermAuthStore } from '@/shared/store/authStore'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useEffect } from 'react'

// Create a client component that uses useSearchParams
function AuthCallbackClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const termAccount = useTermAuthStore((state) => state.setAccount)
  const account = useAuthStore((store) => store.setUser)

  const code = searchParams?.get('code') || '' // URL에서 code 가져오기
  const { data, isLoading } = useGetAuthCallback(code)

  useEffect(() => {
    if (!data) return

    if (!data.has_account) {
      termAccount(data)
      router.push('/terms')
    } else {
      account(data)
      router.push('/idea/input')
    }
  }, [data, router, account, termAccount])

  if (isLoading) return <p>로딩 중...</p>

  return (
    <>
      {!data?.has_account || <h1>기존 회원 페이지로 이동</h1>}
      {data?.has_account || <h1>신규 회원 약관 동의 페이지로 이동</h1>}
    </>
  )
}

// Main page component with proper suspense boundary
export default function AuthCallback() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <AuthCallbackClient />
    </Suspense>
  )
}
