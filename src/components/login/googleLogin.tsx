'use clinet'

import { Button } from '@mui/material'
import styles from '@/shared/ui/login/loginPageStyles'

export default function GoogleLogin() {
  return (
    <Button
      fullWidth
      variant="outlined"
      sx={styles.googleButton}
      onClick={() => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth/google`
      }}
    >
      구글로 로그인
    </Button>
  )
}
