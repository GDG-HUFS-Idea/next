import React from 'react'
import { Box, Typography, Card } from '@mui/material'
import { styles } from '@/shared/ui/analysis/expectedStyles'

const ExpectedBM: React.FC = () => {
  return (
    <Box sx={styles.sectionCard}>
      <Typography variant="h6">📝 예상 BM</Typography>
      <Box sx={styles.bmContainer}>
        <Card sx={styles.bmCard}>큰 BM 제목</Card>
      </Box>
    </Box>
  )
}

export default ExpectedBM
