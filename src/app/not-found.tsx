// app/not-found.tsx
'use client'

import { Container, Typography, Button } from '@mui/material'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h2" color="blue" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        페이지를 찾을 수 없습니다.
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </Typography>
      <Button variant="contained" color="primary" component={Link} href="/">
        홈으로 돌아가기
      </Button>
    </Container>
  )
}
