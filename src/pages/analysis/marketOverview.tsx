import React from 'react'
import { Box, Typography } from '@mui/material'
import { styles } from '@/shared/ui/analysis/marketStyles'
import MarketChart from './marketChart'

const MarketOverview: React.FC = () => {
  return (
    <Box sx={styles.sectionCard}>
      <Typography variant="h6">📈 관련 시장 규모</Typography>
      <Typography variant="h6"> 대분류 중분류 소분류 세분류</Typography>
      <Box sx={styles.chartContainer}>
        {/* 차트 컴포넌트 추가 가능 */}
        <MarketChart />
      </Box>
    </Box>
  )
}

export default MarketOverview
