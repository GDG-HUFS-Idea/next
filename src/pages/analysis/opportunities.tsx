import React from 'react'
import { Box, Typography, Card } from '@mui/material'
import { styles } from '@/shared/ui/analysis/opportunitiesStyles'

const Opportunities: React.FC = () => {
  return (
    <Card sx={styles.sectionCard}>
      <Typography variant="h6">🔍 기회 / 관련 지원 사업</Typography>
      <Box sx={styles.opportunityList}>
        <Card sx={styles.opportunityCard}>
          📄 제 16회 예비 관광 벤처 사업 공모
        </Card>
        <Card sx={styles.opportunityCard}>📄 제 17회 AI 스타트업 공모</Card>
      </Box>
    </Card>
  )
}

export default Opportunities
