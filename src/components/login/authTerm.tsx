import { useRouter } from 'next/navigation'
import {
  Container,
  Typography,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
  Box,
} from '@mui/material'
import { useTermsStore } from '@/shared/store/useTermsStore'
import { useAuthStore, useTermAuthStore } from '@/shared/store/authStore'
import { useTermsQuery, useSignupMutation } from '@/shared/api/getTerms'
import { styles } from '@/shared/ui/login/authTermStytle'
import { useSetCookie } from '@/shared/api/cookie'

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

  const { agreements, setAgreement } = useTermsStore()

  const setUser = useAuthStore((state) => state.setUser)

  // 필수 약관이 전부 체크되었는지 확인
  const isAllRequiredChecked = data?.terms
    ?.filter((term: Term) => term.is_required)
    .every((term: Term) => agreements[term.id])

  // 회원가입 API 호출
  const handleSubmit = () => {
    if (!isAllRequiredChecked) {
      alert('필수 약관에 모두 동의해야 합니다.')
      return
    }

    const session_id = account?.session_id ?? ''
    const user_agreements = data.terms.map((term: Term) => ({
      term_id: term.id,
      has_agreed: agreements[term.id] || false,
    }))

    signupMutation.mutate(
      { sessionId: session_id, agreements: user_agreements },
      {
        onSuccess: (res) => {
          setUser(res)
          cookieMutate(
            { req: res.token },
            { onSuccess: () => console.log('쿠키 저장 성공') }
          )
          router.push('/idea/input') // ✅ 이제 useRouter()를 안전하게 사용 가능
        },
        onError: (error) => {
          console.error('회원가입 요청 실패:', error)
          alert('회원가입 요청에 실패했습니다.')
        },
      }
    )
  }

  return (
    <Container maxWidth="md" sx={styles.container}>
      <Typography variant="h4" gutterBottom>
        이용약관 동의
      </Typography>

      {isLoading ? (
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {data?.terms.map((term: Term) => (
            <Card key={term.id} sx={styles.card}>
              <CardContent>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreements[term.id] || false}
                      onChange={() =>
                        setAgreement(term.id, !agreements[term.id])
                      }
                    />
                  }
                  label={
                    <Typography variant="body1">
                      {term.title}
                      {term.is_required && (
                        <span style={{ color: 'red' }}> *</span>
                      )}
                    </Typography>
                  }
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={styles.termText}
                >
                  {term.content}
                </Typography>
              </CardContent>
            </Card>
          ))}

          {/* 가입하기 버튼 */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={styles.submitButton}
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? '처리 중...' : '가입하기'}
          </Button>
        </Box>
      )}
    </Container>
  )
}
