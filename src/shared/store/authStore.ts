import { create } from 'zustand'

// ✅ 사용자 상태 인터페이스 정의
interface AuthState {
  user: { token: string; name: string; permissions: string[] } | null
  setUser: (user: {
    token: string
    name: string
    permissions: string[]
  }) => void
  logout: () => void
}

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
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))

export const useTermAuthStore = create<TermAuthState>((set) => ({
  account: null,
  setAccount: (account) => set({ account }),
}))
