import { create } from 'zustand'

interface AgreementState {
  selectedIds: number[] // ✅ 동의해야 할 약관 ID 목록
  agreements: { [key: number]: boolean }
  setAgreement: (id: number, value: boolean) => void
  agreeAll: () => void
  setTermsIds: (ids: number[]) => void
}

export const useTermsStore = create<AgreementState>((set) => ({
  selectedIds: [], // 기본적으로 약관 ID 없음
  agreements: {},
  setAgreement: (id, value) =>
    set((state) => ({
      agreements: { ...state.agreements, [id]: value },
    })),
  agreeAll: () =>
    set((state) => ({
      agreements: state.selectedIds.reduce(
        (acc, id) => ({ ...acc, [id]: true }),
        {}
      ),
    })),
  setTermsIds: (ids) => set(() => ({ selectedIds: ids })),
}))
