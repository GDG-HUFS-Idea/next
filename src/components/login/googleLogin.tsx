'use clinet'

import { Button } from '@mui/material'
import styles from '@/shared/ui/login/loginPageStyles'
import { useBaseUrl } from '@/shared/api/getBaseUrl'

export default function GoogleLogin() {
  const { data: baseUrl } = useBaseUrl()
  return (
    <Button
      fullWidth
      variant="outlined"
      sx={styles.googleButton}
      onClick={() => {
        window.location.href = `${baseUrl}` + '/auth/oauth/google'
      }}
    >
      구글로 로그인
    </Button>
  )
}
