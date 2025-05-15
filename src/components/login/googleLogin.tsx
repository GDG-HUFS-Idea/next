'use clinet'

import { Button } from '@mui/material'
import styles from '@/shared/ui/login/loginPageStyles'

export default function GoogleLogin() {
  const baseUrl =
    typeof window !== 'undefined'
      ? window.__ENV__?.NEXT_PUBLIC_API_BASE_URL
      : process.env.NEXT_PUBLIC_API_BASE_URL
  return (
    <Button
      fullWidth
      variant="outlined"
      sx={styles.googleButton}
      onClick={() => {
        window.location.href = `${baseUrl}/auth/oauth/google`
      }}
    >
      구글로 로그인
    </Button>
  )
}
