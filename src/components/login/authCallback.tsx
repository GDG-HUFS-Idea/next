import { useGetAuthCallback } from '@/shared/api/redirect/getAuthCallback'
import { useAuthStore, useTermAuthStore } from '@/shared/store/authStore'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { useSetCookie } from '@/shared/api/cookie'

// Create a client component that uses useSearchParams
function AuthCallbackClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const termAccount = useTermAuthStore((state) => state.setAccount)
  const account = useAuthStore((store) => store.setUser)

  // URL에서 code 가져오기 - 컴포넌트 초기화 시 한 번만 실행되도록 상태로 저장
  const [code] = useState(searchParams?.get('code') || '')
  const { data, isLoading } = useGetAuthCallback(code)

  const cookie = useSetCookie()

  useEffect(() => {
    // data가 없으면 early return
    if (!data) return

    if (!data.has_account) {
      termAccount(data)
      router.push('/terms')
    } else {
      account(data.user)

      // 쿠키 저장 작업
      const req = data.token
      cookie.mutate(
        { req },
        {
          onSuccess: () => {
            console.log('쿠키 저장 성공')
            // 성공 후 라우팅은 onSuccess 콜백에서 처리
            router.push('/idea/input')
          },
          onError: (error) => {
            console.log(error)
            return error
          },
        }
      )
      // router.push를 여기서 제거하고 onSuccess로 이동
    }
  }, [data]) // 의존성 배열 간소화

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
