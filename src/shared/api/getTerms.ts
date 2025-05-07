import { useQuery, useMutation } from '@tanstack/react-query'

// 특정 약관 ID들만 요청하는 GET API
const fetchTermsByIds = async (ids: number[]) => {
  if (!ids.length) return { terms: [] } // ID가 없으면 빈 배열 반환

  const queryString = ids.map((id) => `ids=${id}`).join('&') // URL 파라미터 변환
  const res = await fetch(`http://suehyun.kro.kr/terms?${queryString}`)

  if (!res.ok) throw new Error('이용약관 데이터를 불러올 수 없습니다.')
  return res.json()
}

// 회원가입 요청 API
const postSignup = async ({
  sessionId,
  agreements,
}: {
  sessionId: string
  agreements: {
    term_id: number
    has_agreed: boolean
  }[]
}) => {
  const data = {
    session_id: sessionId,
    user_agreements: agreements,
  }
  const res = await fetch(`http://suehyun.kro.kr/auth/oauth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    console.log(res)
    throw new Error('회원가입 요청 실패')
  }
  return res.json()
}

// React Query hooks
export const useTermsQuery = (ids: number[]) => {
  return useQuery({
    queryKey: ['terms', ids],
    queryFn: () => fetchTermsByIds(ids),
    enabled: ids.length > 0, // ID 목록이 비어있을 경우 요청하지 않음
  })
}

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (variables: {
      sessionId: string
      agreements: {
        term_id: number
        has_agreed: boolean
      }[]
    }) => postSignup(variables),
  })
}
