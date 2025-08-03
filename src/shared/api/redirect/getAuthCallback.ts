import { useQuery } from '@tanstack/react-query'

export const useGetAuthCallback = (code: string) => {
  return useQuery({
    queryKey: ['auth', 'oauth', 'result', code],
    queryFn: async () => {
      const res = await fetch(`/api/auth/oauth/result?code=${code}`) // ✅ 프록시 경로에 맞게 수정

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      return res.json()
    },
    enabled: !!code,
  })
}
