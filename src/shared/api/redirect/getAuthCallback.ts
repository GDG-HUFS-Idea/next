import { useQuery } from '@tanstack/react-query'

export const useGetAuthCallback = (code: string) => {
  return useQuery({
    queryKey: ['auth', 'oauth', 'callback', code], // queryKey에 code 포함
    queryFn: async () => {
      if (!code) return null // code가 없으면 API 요청 안 함
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth/callback?code=${code}`
      )
      return res.json()
    },
  })
}
