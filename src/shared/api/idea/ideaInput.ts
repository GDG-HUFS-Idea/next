// shared/api/idea/ideaInput.ts
import { useMutation } from '@tanstack/react-query'
import { useGetCookie } from '@/shared/api/cookie'
import { fetchSSEStatus } from '@/shared/api/idea/fetchSSEStatus'
// 타입 정의
export interface AnalysisStatusResponse {
  is_complete: boolean
  progress?: number
  message?: string
  result?: {
    project: {
      id: number
      name: string
    }
  }
}

export interface IdeaData {
  problem: string
  solution: string
}

export interface TaskResponse {
  task_id: string
}

// 아이디어 등록 API
export const postIdeaInput = async (
  data: IdeaData,
  token: string
): Promise<TaskResponse> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/analyses/overview`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )

    if (!res.ok) {
      console.log(res)
      throw new Error(`아이디어 등록 실패: ${res.status}`)
    }

    const result = await res.json()
    return result
  } catch (error) {
    throw error
  }
}

export const fetchIdeaStatus = async (
  taskId: string,
  token: string
): Promise<AnalysisStatusResponse> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/analyses/overview/status?task_id=${taskId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!res.ok) {
      throw new Error(`분석 상태 조회 실패: ${res.status}`)
    }

    const result: AnalysisStatusResponse = await res.json()
    return result
  } catch (error) {
    throw error
  }
}

// 아이디어 등록을 위한 mutation 훅
export const usePostIdeaInput = () => {
  const { data } = useGetCookie()
  const token = data?.jwt
  return useMutation<TaskResponse, Error, IdeaData>({
    mutationFn: (data: IdeaData) => {
      return postIdeaInput(data, token!)
    },
  })
}

// 분석 상태 조회를 위한 query 훅
export const useIdeaStatus = (taskId: string) => {
  const { data } = useGetCookie()
  const token = data?.jwt

  return useMutation({
    mutationKey: ['analysis-status', taskId, token],
    mutationFn: async ({
      onProgress,
    }: {
      onProgress: (status: AnalysisStatusResponse) => void
    }) => {
      return fetchSSEStatus({
        taskId,
        token,
        onProgress,
      })
    },
  })
}
