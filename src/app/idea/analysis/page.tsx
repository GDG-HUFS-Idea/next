'use client'

import React from 'react'
import { Box } from '@mui/material'
import AnalysisResults from '@/components/analysis/analysisResults'
import MarketOverview from '@/components/analysis/marketOverview'
import SimilarServices from '@/components/analysis/similarServices'
import ExpectedBM from '@/components/analysis/expectedBM'
import Opportunities from '@/components/analysis/opportunities'
import TeamAndChallengers from '@/components/analysis/teamAndChallenges'
import MainTarget from '@/components/analysis/mainTarget'
import MarketingStrategy from '@/components/analysis/marketingStrategy'
import { useGetIdeaOverview } from '@/shared/api/idea/getIdeaOverview'

export default function AnalysisPage() {
  const projectId = 10
  const { data } = useGetIdeaOverview(projectId)
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
