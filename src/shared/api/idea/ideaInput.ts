// shared/api/idea/ideaInput.ts
import { useQuery, useMutation } from '@tanstack/react-query'

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
export const postIdeaInput = async (data: IdeaData): Promise<TaskResponse> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/projects/analyses/overview`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_JWT}`,
        },
        body: JSON.stringify(data),
      }
    )

    if (!res.ok) {
      throw new Error(`아이디어 등록 실패: ${res.status}`)
    }

    const result = await res.json()
    return result
  } catch (error) {
    throw error
  }
}

// 분석 상태 조회 API - 모의 데이터 반환
export const fetchIdeaStatus = async (
  taskId: string
): Promise<AnalysisStatusResponse> => {
  try {
    // 실제 API 요청
    const shouldMock = true // 실제 API가 작동하지 않으므로 모의 데이터 사용

    if (!shouldMock) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/projects/analyses/overview/status?task_id=${taskId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'text/event-stream',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_JWT}`,
          },
        }
      )

      if (!res.ok) {
        throw new Error(`분석 상태 조회 실패: ${res.status}`)
      }

      const result = await res.json()
      return result
    }

    // 모의 데이터 반환 (API가 작동하지 않을 때)
    // 이전 호출 시간 및 진행 상태 추적
    if (!window.__mockData) {
      window.__mockData = {
        startTime: Date.now(),
        progress: 0,
        totalDuration: 15000, // 15초 후 완료
        completed: false,
        calls: 0,
      }
    }

    // 호출 카운트 증가
    window.__mockData.calls++

    // 실행 시간에 따른 진행률 계산
    const elapsedTime = Date.now() - window.__mockData.startTime
    const progress = Math.min(elapsedTime / window.__mockData.totalDuration, 1)
    window.__mockData.progress = progress

    // 진행률에 따른 메시지 설정
    let message = '분석 초기화 중...'
    if (progress > 0.2) message = '시장 데이터 수집 중...'
    if (progress > 0.4) message = '경쟁사 분석 중...'
    if (progress > 0.6) message = 'SWOT 분석 생성 중...'
    if (progress > 0.8) message = '최종 보고서 준비 중...'

    // 진행 완료 여부 결정
    const isComplete = progress >= 1
    if (isComplete) {
      window.__mockData.completed = true
    }

    // 결과 준비
    const result: AnalysisStatusResponse = {
      is_complete: isComplete,
      progress: progress,
      message: message,
    }

    // 완료된 경우 결과 추가
    if (isComplete) {
      result.result = {
        project: {
          id: 12345,
          name: '혁신적인 아이디어 분석 결과',
        },
      }
    }

    // 네트워크 지연 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 300))

    return result
  } catch (error) {
    throw error
  }
}

// 모의 데이터용 전역 변수 타입 정의
declare global {
  interface Window {
    __mockData?: {
      startTime: number
      progress: number
      totalDuration: number
      completed: boolean
      calls: number
    }
  }
}

// 아이디어 등록을 위한 mutation 훅
export const usePostIdeaInput = () => {
  return useMutation<TaskResponse, Error, IdeaData>({
    mutationFn: postIdeaInput,
  })
}

// 분석 상태 조회를 위한 query 훅
export const useIdeaStatus = (taskId: string | null, enabled = false) => {
  return useQuery<AnalysisStatusResponse, Error>({
    queryKey: ['ideaStatus', taskId],
    queryFn: () => fetchIdeaStatus(taskId!),
    enabled: !!taskId && enabled,
    refetchInterval: (data) => {
      // 이미 완료되었거나 오류가 있으면 폴링 중단
      if (data?.is_complete) {
        return false // 완료되면 폴링 중단
      }
      return 500 // 0.5초마다 폴링
    },
    retry: 3, // 최대 3번 재시도
    retryDelay: 1000, // 오류 시 1초 후 재시도
  })
}
