import React from 'react'
import { Box, Card } from '@mui/material'
import { styles } from '@/shared/ui/analysis/teamStyles'

const TeamAndChallenges: React.FC = () => {
  return (
    <Box sx={styles.sectionContainer}>
      <Card sx={styles.teamCard}>👥 예상 필요 팀원</Card>
      <Card sx={styles.challengeCard}>🔍 한계점</Card>
    </Box>
  )
}

export default TeamAndChallenges
