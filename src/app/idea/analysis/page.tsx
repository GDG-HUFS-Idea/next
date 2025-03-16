'use client'

import React from 'react'
import { Box } from '@mui/material'
import AnalysisResults from '@/pages/analysis/analysisResults'
import MarketOverview from '@/pages/analysis/marketOverview'
import SimilarServices from '@/pages/analysis/similarServices'
import ExpectedBM from '@/pages/analysis/expectedBM'
import Opportunities from '@/pages/analysis/opportunities'
import TeamAndChallengers from '@/pages/analysis/teamAndChallenges'
import MainTarget from '@/pages/analysis/mainTarget'
import MarketingStrategy from '@/pages/analysis/marketingStrategy'

export default function AnalysisPage() {
  return (
    <Box sx={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <AnalysisResults />
      <MarketOverview />
      <SimilarServices />
      <MainTarget />
      <ExpectedBM />
      <MarketingStrategy />
      <Opportunities />
      <TeamAndChallengers />
    </Box>
  )
}
