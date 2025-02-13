'use client'

import React from 'react'
import { Card, Button, Box, Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import styles from '@/shared/ui/login/loginPageStyles'

const LoginPage: React.FC = () => {
  return (
    <Box sx={styles.pageContainer}>
      {/* Main Content */}
      <Container component="main" sx={styles.mainContainer}>
        <Box sx={styles.gridContainer}>
          {/* Left Section */}
          <Card sx={styles.leftCard}>
            <Typography sx={styles.subtitle}>
              당신의 아이디어는 특별하니까.
            </Typography>
          </Card>

          {/* Right Section */}
          <Card sx={styles.rightCard}>
            <Button fullWidth variant="contained" sx={styles.naverButton}>
              N 네이버 로그인
            </Button>
            <Button fullWidth variant="contained" sx={styles.kakaoButton}>
              카카오 로그인
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={styles.googleButton}
              onClick={() => {
                window.location.href = 'http://suehyun.kro.kr/api/oauth2/google'
              }}
            >
              구글로 로그인
            </Button>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}
export default LoginPage
