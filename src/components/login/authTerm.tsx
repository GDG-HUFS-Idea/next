import { useRouter } from 'next/navigation'
import {
  Container,
  Typography,
  // Card,
  // CardContent,
  // FormControlLabel,
  // Checkbox,
  // Button,
  CircularProgress,
  Box,
} from '@mui/material'
//import { useTermsStore } from '@/shared/store/useTermsStore'
import { useTermAuthStore } from '@/shared/store/authStore'
import { useTermsQuery, useSignupMutation } from '@/shared/api/getTerms'
import { styles } from '@/shared/ui/login/authTermStytle'
import { useSetCookie } from '@/shared/api/cookie'
import React from 'react'

interface Term {
  id: number
  title: string
  content: string
  is_required: boolean
  written_at: string
  type: string
}

export default function AuthTerm() {
  const account = useTermAuthStore().account
  const ids = account?.term_ids ?? []
  const router = useRouter()
  const { data, isLoading } = useTermsQuery(ids)
  const signupMutation = useSignupMutation()

  const { mutate: cookieMutate } = useSetCookie()

  //const { agreements, setAgreement } = useTermsStore()

  // // 필수 약관이 전부 체크되었는지 확인
  // const isAllRequiredChecked = data?.terms
  //   ?.filter((term: Term) => term.is_required)
  //   .every((term: Term) => agreements[term.id])

  // 회원가입 API 호출
  const handleSubmit = () => {
    const session_id = account?.session_id ?? ''

    // 모든 약관에 대해 동의 처리
    const user_agreements =
      data?.terms.map((term: Term) => ({
        term_id: term.id,
        has_agreed: true, // 모든 약관에 자동으로 동의 설정
      })) || []

    signupMutation.mutate(
      { sessionId: session_id, agreements: user_agreements },
      {
        onSuccess: (res) => {
          cookieMutate(
            { req: { token: res.token, user: res.user } },
            { onSuccess: () => console.log('쿠키 저장 성공') }
          )
          router.push('/idea/input')
        },
        onError: (error) => {
          console.error('회원가입 요청 실패:', error)
          alert('회원가입 요청에 실패했습니다.')
        },
      }
    )
  }

  // 데이터가 로드되면 자동으로 회원가입 요청
  React.useEffect(() => {
    if (data && !isLoading) {
      handleSubmit()
    }
  }, [data, isLoading])

  return (
    <Container maxWidth="md" sx={styles.container}>
      <Typography variant="h4" gutterBottom>
        약관 동의 처리 중...
      </Typography>

      <Box sx={styles.loadingBox}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          약관 동의 및 회원가입을 자동으로 처리하고 있습니다.
        </Typography>
      </Box>
    </Container>
  )
}
