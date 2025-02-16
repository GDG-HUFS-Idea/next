'use client'

import React from 'react'
import { Box } from '@mui/material'
import AnalysisResults from '@/pages/analysis/analysisResults'
import MarketOverview from '@/pages/analysis/marketOverview'
import SimilarServices from '@/pages/analysis/similarServices'
import ExpectedBM from '@/pages/analysis/expectedBM'
import Opportunities from '@/pages/analysis/opportunities'
import TeamAndChallenges from '@/pages/analysis/teamAndChallenges'

export default function AnalysisPage() {
  return (
    <Box sx={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <AnalysisResults />
      <MarketOverview />
      <SimilarServices />
      <ExpectedBM />
      <Opportunities />
      <TeamAndChallenges />
    </Box>
  )
}
