import { useMutation, useQuery } from '@tanstack/react-query'

// TanStack Query를 사용하여 쿼리 생성
export const useGetCookie = () => {
  return useQuery({
    queryKey: ['api', 'login'],
    queryFn: async () => {
      const response = await fetch('/api/login')
      if (!response.ok) {
        return null
      }
      const data = await response.json()
      return data.jwt
    },
    staleTime: Infinity, // baseURL은 세션 동안 변경되지 않으므로 staleTime을 Infinity로 설정
    retry: 3, // 실패 시 3번 재시도
    placeholderData: null, // 초기 로딩 시 빈 문자열을 반환
  })
}

// TanStack Query를 사용하여 쿼리 생성
export const useSetCookie = () =>
  useMutation({
    mutationFn: async (variables: { req: string }) => {
      const { req } = variables
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: req }),
      })
      if (!response.ok) {
        throw new Error('Failed to set cookie')
      }
      return response.json()
    },
  })
