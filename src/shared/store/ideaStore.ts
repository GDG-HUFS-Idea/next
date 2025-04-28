// shared/store/ideaStore.ts
import { create } from 'zustand'

// 분석 결과 타입 정의
interface AnalysisResult {
  project?: {
    id: number
    name: string
  }
  // 여기에 필요한 다른 결과 필드 추가
}

// 스토어 상태 타입 정의
interface IdeaStoreState {
  // 태스크 ID 관리
  taskId: string | null
  setTaskId: (id: string) => void

  // 분석 결과 관리
  analysisResult: AnalysisResult | null
  setAnalysisResult: (result: AnalysisResult) => void

  // 분석 완료 상태 관리
  isAnalysisComplete: boolean
  setAnalysisComplete: (isComplete: boolean) => void

  // 스토어 초기화
  resetStore: () => void
}

// Zustand 스토어 생성
export const ideaStore = create<IdeaStoreState>((set) => ({
  // 초기 상태
  taskId: null,
  analysisResult: null,
  isAnalysisComplete: false,

  // 태스크 ID 설정 액션
  setTaskId: (id: string) => set({ taskId: id }),

  // 분석 결과 설정 액션
  setAnalysisResult: (result: AnalysisResult) =>
    set({
      analysisResult: result,
      isAnalysisComplete: true, // 결과가 설정되면 자동으로 완료 상태로 변경
    }),

  // 분석 완료 상태 설정 액션
  setAnalysisComplete: (isComplete: boolean) =>
    set({ isAnalysisComplete: isComplete }),

  // 스토어 초기화 액션
  resetStore: () =>
    set({
      taskId: null,
      analysisResult: null,
      isAnalysisComplete: false,
    }),
}))

// 기존 taskIdStore는 이제 필요 없으므로 ideaStore로 대체 가능
export const taskIdStore = ideaStore
