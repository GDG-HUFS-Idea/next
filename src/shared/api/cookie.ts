import { useMutation, useQuery } from '@tanstack/react-query'

interface ReqType {
  token: string
  user: {
    id: number
    name: string
    permissions: string[]
  }
}

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
      return data
    },
    staleTime: Infinity, // baseURL은 세션 동안 변경되지 않으므로 staleTime을 Infinity로 설정
    retry: 3, // 실패 시 3번 재시도
    placeholderData: null, // 초기 로딩 시 빈 문자열을 반환
  })
}

// TanStack Query를 사용하여 쿼리 생성
export const useSetCookie = () =>
  useMutation({
    mutationFn: async (variables: { req: ReqType }) => {
      const { req } = variables
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ req: req }),
      })
      if (!response.ok) {
        console.log(response, req)
        throw new Error('Failed to set cookie')
      }
      return response.json()
    },
  })

export const useDeleteCookie = () =>
  useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/login', {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete cookie')
      }
      return response.json()
    },
  })
