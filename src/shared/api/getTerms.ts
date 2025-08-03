import { useQuery, useMutation } from '@tanstack/react-query'

// 특정 약관 ID들만 요청하는 GET API
const fetchTermsByIds = async (ids: number[]) => {
  if (!ids.length) return { terms: [] }

  const queryString = ids.map((id) => `ids=${id}`).join('&')
  const res = await fetch(`/api/terms?${queryString}`)

  console.log('응답 상태:', res.status)
  console.log('응답 헤더:', res.headers.get('content-type'))

  // 응답을 복제해서 한 번은 텍스트로, 한 번은 JSON으로 읽기
  const resClone = res.clone()
  const responseText = await resClone.text()
  console.log('응답 텍스트:', responseText)

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${responseText}`)
  }

  // 원본 응답으로 JSON 파싱
  const result = await res.json()
  console.log('파싱된 데이터:', result)
  return result
}

// 회원가입 요청 API
const postSignup = async ({
  code,
  term_agreements,
}: {
  code: string
  term_agreements: {
    term_id: number
    is_agreed: boolean
  }[]
}) => {
  const data = {
    code: code,
    term_agreements: term_agreements,
  }
  console.log(data)
  const res = await fetch(`/api/auth/oauth/signup`, {
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
  return await res.json()
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
      code: string
      term_agreements: {
        term_id: number
        is_agreed: boolean
      }[]
    }) => postSignup(variables),
  })
}
