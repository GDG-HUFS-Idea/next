import React from 'react'
import { Box, Card, Grid2, CardContent, Typography } from '@mui/material'
import { styles } from '@/shared/ui/analysis/teamAndChallengesStyles'

const Team: React.FC = () => {
  return (
    <Box sx={styles.opportunityList}>
      <Typography variant="h6">🤝 예상 필요 팀원</Typography>
      <Grid2 container spacing={0} display="flex" justifyContent="center">
        <Grid2 size={5}>
          <Card sx={styles.opportunityCard}>
            <CardContent>
              <Typography variant="subtitle1">지원 사업 1</Typography>
              <Typography variant="body2" color="text.secondary">
                정부 지원 정책 또는 각종 혜택
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={5}>
          <Card sx={styles.opportunityCard}>
            <CardContent>
              <Typography variant="subtitle1">지원 사업 2</Typography>
              <Typography variant="body2" color="text.secondary">
                중소기업 지원 프로그램
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={5}>
          <Card sx={styles.opportunityCard}>
            <CardContent>
              <Typography variant="subtitle1">지원 사업 3</Typography>
              <Typography variant="body2" color="text.secondary">
                기타 제도
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={5}>
          <Card sx={styles.opportunityCard}>
            <CardContent>
              <Typography variant="subtitle1">지원 사업 1</Typography>
              <Typography variant="body2" color="text.secondary">
                정부 지원 정책 또는 각종 혜택
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default Team
