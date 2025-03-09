import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type ResponseLoginValue = {
  has_account: boolean
  token: string
  user: {
    name: string
    permissions: string[]
  }
}

export default function AuthCallback() {
  const router = useRouter()
  const { code } = router.query // 쿼리 파라미터에서 `code` 가져오기

  const { data, error, isLoading } = useQuery<ResponseLoginValue>({
    queryKey: ['auth', code], // queryKey는 동적인 값 포함 가능
    queryFn: async () => {
      if (!code) return null // code가 없으면 요청하지 않음
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth?code=${code}`
      )
      return res.json()
    },
    enabled: !!code, // `code`가 있을 때만 실행
  })

  useEffect(() => {
    if (data) {
      router.push('/terms')
    }
  }, [data, router])

  if (isLoading) return <p>로딩 중...</p>
  if (error) return <p>에러 발생: {error.message}</p>

  return <p>인증 중...</p> // 데이터를 기다리는 동안 표시할 UI
}
