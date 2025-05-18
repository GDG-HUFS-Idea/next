'use clinet'

import { Button } from '@mui/material'
import styles from '@/shared/ui/login/loginPageStyles'
import { env } from 'next-runtime-env'

export default function GoogleLogin() {
  const apiBaseUrl = env('NEXT_PUBLIC_API_BASE_URL')

  return (
    <Button
      fullWidth
      variant="outlined"
      sx={styles.googleButton}
      onClick={() => {
        window.location.href = `${apiBaseUrl}/auth/oauth/google`
      }}
    >
      구글로 로그인
    </Button>
  )
}
