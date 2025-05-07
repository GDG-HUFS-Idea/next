// myProject.ts
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGetCookie } from '@/shared/api/cookie'
import { useBaseUrl } from '@/shared/api/getBaseUrl'

// 프로젝트 목록을 가져오는 커스텀 훅
export const useMyProjects = (params = { offset: 0, limit: 10 }) => {
  const { data: token } = useGetCookie()
  const { data: baseUrl } = useBaseUrl()
  return useQuery({
    queryKey: ['myProjects', params, baseUrl, token], // 쿼리 키에 params와 baseUrl, token 포함
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/projects/my`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    },
    enabled: false, // 자동 실행 비활성화 (필요할 때만 refetch 호출)
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  })
}
