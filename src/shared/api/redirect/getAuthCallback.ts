import { useQuery } from '@tanstack/react-query'
import { useBaseUrl } from '../getBaseUrl'

export const useGetAuthCallback = (code: string) => {
  const { data: baseUrl } = useBaseUrl() // baseUrl 가져오기
  return useQuery({
    queryKey: ['auth', 'oauth', 'callback', code, baseUrl], // queryKey에 code 포함
    queryFn: async () => {
      if (!code) return null // code가 없으면 API 요청 안 함
      const res = await fetch(`${baseUrl}/auth/oauth/callback?code=${code}`)
      return res.json()
    },
  })
}
