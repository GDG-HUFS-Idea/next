import React from 'react'
import { Box, Typography, Card, Grid2, CardContent } from '@mui/material'

import { styles } from '@/shared/ui/analysis/opportunitiesStyles'

const Opportunities: React.FC = () => {
  return (
    <Box sx={styles.sectionCard}>
      <Typography variant="h6">🔍 기회 / 관련 지원 사업</Typography>
      <Box sx={styles.opportunityList}>
        <Grid2 container spacing={5}>
          <Grid2 size={6}>
            <Card sx={styles.opportunityCard}>
              <CardContent>
                <Typography variant="subtitle1">지원 사업 1</Typography>
                <Typography variant="body2" color="text.secondary">
                  정부 지원 정책 또는 각종 혜택
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={6}>
            <Card sx={styles.opportunityCard}>
              <CardContent>
                <Typography variant="subtitle1">지원 사업 2</Typography>
                <Typography variant="body2" color="text.secondary">
                  중소기업 지원 프로그램
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={6}>
            <Card sx={styles.opportunityCard}>
              <CardContent>
                <Typography variant="subtitle1">지원 사업 3</Typography>
                <Typography variant="body2" color="text.secondary">
                  기타 제도
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  )
}

export default Opportunities
