'use client'

import React from 'react'
import { Box, Typography, CircularProgress, Alert } from '@mui/material'
import AnalysisResults from '@/pages/analysis/analysisResults'
import MarketOverview from '@/pages/analysis/marketOverview'
import SimilarServices from '@/pages/analysis/similarServices'
import ExpectedBM from '@/pages/analysis/expectedBM'
import Opportunities from '@/pages/analysis/opportunities'
import TeamAndChallengers from '@/pages/analysis/teamAndChallenges'
import MainTarget from '@/pages/analysis/mainTarget'
import MarketingStrategy from '@/pages/analysis/marketingStrategy'
import { useGetIdeaOverview } from '@/shared/api/idea/getIdeaOverview'

export default function AnalysisPage() {
  const projectId = 10
  const { data, isError, error } = useGetIdeaOverview(projectId)
  console.log('data', data)

  return (
    <Box
      sx={{
        padding: { xs: '16px', md: '24px' },
        maxWidth: '1200px',
        margin: '0 auto',
        bgcolor: '#f9fafb',
      }}
    >
      {/* 모든 컴포넌트에 API 데이터 매핑 */}
      <AnalysisResults data={data} />

      <MarketOverview data={data?.market_stats} />

      <SimilarServices data={data?.similar_service} />

      <MainTarget data={data?.target_markets} />

      <ExpectedBM data={data?.business_model} />

      <MarketingStrategy data={data?.support_programs} />

      <Opportunities
        opportunityData={data?.opportunity}
        limitationData={data?.limitation}
      />

      <TeamAndChallengers data={data?.team_requirements} />
    </Box>
  )

}
