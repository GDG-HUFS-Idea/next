// myProject.ts
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGetCookie } from '@/shared/api/cookie'

// 프로젝트 목록을 가져오는 커스텀 훅
export const useMyProjects = (params = { offset: 0, limit: 10 }) => {
  const { data } = useGetCookie()
  const token = data?.jwt // 쿠키에서 토큰 가져오기
  return useQuery({
    queryKey: ['myProjects', params, token], // 쿼리 키에 params와 baseUrl, token 포함
    queryFn: async () => {
      const response = await axios.get(`/api/projects`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    },
    enabled: !!token, // 토큰이 있을 때만 자동 실행
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  })
}
