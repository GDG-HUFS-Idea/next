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
  const projectId = 6
  const { data, isError, error } = useGetIdeaOverview(projectId)
  console.log('data', data)
  // 에러 상태 처리
  if (isError) {
    return (
      <Box sx={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Alert severity="error">
          {error instanceof Error
            ? error.message
            : '분석 데이터를 불러오는데 실패했습니다'}
        </Alert>
      </Box>
    )
  }

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
