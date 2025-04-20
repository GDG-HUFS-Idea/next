'use client'

import React from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Divider,
} from '@mui/material'
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
  const projectId = 12 // Consider getting this from route params or props
  const { data, isLoading, isError, error } = useGetIdeaOverview(projectId)

  // Handle loading state
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  // Handle error state
  if (isError) {
    return (
      <Box sx={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Alert severity="error">
          {error instanceof Error
            ? error.message
            : 'Failed to load analysis data'}
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
      }}
    >
      {/* Header with project info */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {data?.project?.name || 'Project Analysis'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {data?.review || 'Loading project review...'}
        </Typography>
      </Paper>

      {/* Analysis sections mapped to API structure */}
      <AnalysisResults data={data} />
      <Divider sx={{ my: 3 }} />

      <MarketOverview data={data?.market_stats} />
      <Divider sx={{ my: 3 }} />

      <SimilarServices data={data?.similar_service} />
      <Divider sx={{ my: 3 }} />

      <MainTarget data={data?.target_markets} />
      <Divider sx={{ my: 3 }} />

      <ExpectedBM data={data?.business_model} />
      <Divider sx={{ my: 3 }} />

      <MarketingStrategy data={data?.support_programs} />
      <Divider sx={{ my: 3 }} />

      <Opportunities
        opportunityData={data?.opportunity}
        limitationData={data?.limitation}
      />
      <Divider sx={{ my: 3 }} />

      <TeamAndChallengers data={data?.team_requirements} />
    </Box>
  )
}
