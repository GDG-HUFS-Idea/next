import { create } from 'zustand'

// ✅ 사용자 상태 인터페이스 정의

interface TermAuthState {
  account: {
    has_account: boolean
    session_id: string
    term_ids: number[]
  } | null
  setAccount: (account: {
    has_account: boolean
    session_id: string
    term_ids: number[]
  }) => void
}

// ✅ Zustand store 생성

export const useTermAuthStore = create<TermAuthState>((set) => ({
  account: null,
  setAccount: (account) => set({ account }),
}))
