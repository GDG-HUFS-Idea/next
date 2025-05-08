import { useQuery } from '@tanstack/react-query'
import { env } from 'next-runtime-env'

export const useGetAuthCallback = (code: string) => {
  return useQuery({
    queryKey: ['auth', 'oauth', 'callback', code], // queryKey에 code 포함
    queryFn: async () => {
      const apiBaseUrl = env('NEXT_PUBLIC_API_BASE_URL')
      if (!code) return null // code가 없으면 API 요청 안 함
      const res = await fetch(`${apiBaseUrl}/auth/oauth/callback?code=${code}`)
      return res.json()
    },
  })
}
