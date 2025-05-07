import { useQuery } from '@tanstack/react-query'

// TanStack Query를 사용하여 baseURL 쿼리 생성
export const useBaseUrl = () => {
  return useQuery({
    queryKey: ['baseUrl'],
    queryFn: async () => {
      const response = await fetch('/api/baseUrl')
      if (!response.ok) {
        throw new Error('Failed to fetch baseURL')
      }
      const data = await response.json()
      return data.baseUrl
    },
    staleTime: Infinity, // baseURL은 세션 동안 변경되지 않으므로 staleTime을 Infinity로 설정
    retry: 3, // 실패 시 3번 재시도
    placeholderData: '', // 초기 로딩 시 빈 문자열을 반환
  })
}
