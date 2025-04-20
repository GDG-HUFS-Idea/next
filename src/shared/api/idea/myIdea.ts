// myProject.ts
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// 프로젝트 목록을 가져오는 커스텀 훅
export const useMyProjects = (params = { offset: 0, limit: 10 }) => {
  return useQuery({
    queryKey: ['myProjects', params],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/projects/my`,
        {
          params,
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_JWT}`,
          },
        }
      )
      return response.data
    },
    enabled: false, // 자동 실행 비활성화 (필요할 때만 refetch 호출)
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  })
}

// 일반 함수 버전 - 컴포넌트 외부에서 호출 가능
export const getMyProjects = async (params = { offset: 0, limit: 10 }) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/projects/my`,
      {
        params,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_JWT}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw error
  }
}
