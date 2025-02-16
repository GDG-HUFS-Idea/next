import React from 'react'
import { Box, Typography, Card } from '@mui/material'
import { styles } from '@/shared/ui/analysis/marketStyles'
import MarketChart from './marketChart'

const MarketOverview: React.FC = () => {
  return (
    <Card sx={styles.sectionCard}>
      <Typography variant="h6">관련 시장 규모</Typography>
      <Typography variant="body2">대분류 중분류 소분류 세분류</Typography>
      <Box sx={styles.chartContainer}>
        {/* 차트 컴포넌트 추가 가능 */}
        <MarketChart />
      </Box>
    </Card>
  )
}

export default MarketOverview
