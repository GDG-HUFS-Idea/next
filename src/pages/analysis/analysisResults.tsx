import React from 'react'
import { Box, Typography, Card } from '@mui/material'
import { styles } from '@/shared/ui/analysis/analysisStyles'
import { Zap, Brain, MessageCircleMore, Eye } from 'lucide-react'

const AnalysisResults: React.FC = () => {
  return (
    <Card sx={styles.sectionCard}>
      <Typography variant="h5" fontWeight="bold">
        Analysis Results
      </Typography>
      <Box sx={styles.analysisContent}>
        <Typography variant="body1">
          제안하신 아이디어는 ~~~ 요소가 강점이 될 수 있고, ~~~ 부분에 위험성이
          있습니다. 시장의 진출 타이밍을 하반기가 적절해보입니다.
        </Typography>
        <Box sx={styles.scoreBoard}>
          <Card sx={styles.scoreCardRed} color="error">
            <Typography color="red">
              <Zap size={16} strokeWidth={1.75} /> 시장 규모
            </Typography>
            <Typography>80 / 100</Typography>
          </Card>
          <Card sx={styles.scoreCardYellow} color="warning">
            <Typography color="#f5d400">
              <Brain size={16} strokeWidth={1.75} /> 기회
            </Typography>
            <Typography>92 / 100</Typography>
          </Card>
          <Card sx={styles.scoreCardBlue} color="info">
            <Typography color="#00c227">
              <MessageCircleMore size={16} strokeWidth={1.75} /> 유사 서비스
            </Typography>
            <Typography>61 / 100</Typography>
          </Card>
          <Card sx={styles.scoreCardViolet} color="primary">
            <Typography color="#232fd1">
              <Eye size={16} strokeWidth={1.75} /> 한계점
            </Typography>
            <Typography>72 / 100</Typography>
          </Card>
        </Box>
      </Box>
    </Card>
  )
}

export default AnalysisResults
