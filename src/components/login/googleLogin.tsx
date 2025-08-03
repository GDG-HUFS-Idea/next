'use client'

import { Button } from '@mui/material'
import styles from '@/shared/ui/login/loginPageStyles'
import { getEnv } from '@/util/env'

export default function GoogleLogin() {
  const handleGoogleLogin = () => {
    const apiBaseUrl = getEnv('NEXT_PUBLIC_API_URL')
    const frontendUrl = getEnv('NEXT_PUBLIC_FRONTEND_URL')
    console.log(apiBaseUrl, frontendUrl)

    if (!apiBaseUrl || !frontendUrl) {
      console.error('API URL 또는 Frontend URL이 설정되지 않았습니다.')
      alert('로그인 설정에 문제가 발생했습니다. 관리자에게 문의하세요.')
      return
    }

    const redirectUrl = `${frontendUrl}/redirect`
    const googleLoginUrl = `${apiBaseUrl}/auth/oauth/google?frontend_redirect_url=${redirectUrl}`

    window.location.href = googleLoginUrl
  }

  return (
    <Button
      fullWidth
      variant="outlined"
      sx={styles.googleButton}
      onClick={handleGoogleLogin}
    >
      구글로 로그인
    </Button>
  )
}
