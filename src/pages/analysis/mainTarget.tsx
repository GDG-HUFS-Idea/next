import React from 'react'
import { Box, Typography, Card } from '@mui/material'
import { styles } from '../../shared/ui/analysis/expectedStyles'

const MainTarget: React.FC = () => {
  return (
    <Box sx={styles.sectionCard}>
      <Box display="flex">
        <Typography variant="h6">📝 주요 타겟</Typography>
      </Box>

      <Box sx={styles.bmContainer}>
        <Card sx={styles.bmCard}>큰 제목</Card>
      </Box>
    </Box>
  )
}

export default MainTarget
