'use client'

import React, { useEffect, Suspense } from 'react'
import { Box, Alert, CircularProgress, Typography } from '@mui/material'
import AnalysisResults from '@/components/analysis/analysisResults'
import MarketOverview from '@/components/analysis/marketOverview'
import SimilarServices from '@/components/analysis/similarServices'
import ExpectedBM from '@/components/analysis/expectedBM'
import Opportunities from '@/components/analysis/opportunities'
import TeamAndChallengers from '@/components/analysis/teamAndLimitations'
import MainTarget from '@/components/analysis/mainTarget'
import MarketingStrategy from '@/components/analysis/marketingStrategy'
import { useGetIdeaOverview } from '@/shared/api/idea/getIdeaOverview'
import { ideaStore } from '@/shared/store/ideaStore'
import { useGetCookie } from '@/shared/api/cookie'
import { useRouter } from 'next/navigation'
import { IdeaOverviewResponse } from '@/shared/type/ideaType'

// Loading skeleton component
const LoadingSkeleton = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      gap: 2,
    }}
  >
    <CircularProgress size={60} />
    <Typography variant="h6" color="text.secondary">
      분석 결과를 불러오는 중...
    </Typography>
  </Box>
)

// Error component
const ErrorDisplay = ({
  error,
  onRetry,
}: {
  error: string
  onRetry: () => void
}) => (
  <Alert
    severity="error"
    sx={{ mb: 2 }}
    action={
      <button onClick={onRetry} style={{ marginLeft: '8px' }}>
        다시 시도
      </button>
    }
  >
    {error}
  </Alert>
)

// Main analysis content component
const AnalysisContent = ({ data }: { data: IdeaOverviewResponse }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* 전체 분석 결과 개요 */}
      <AnalysisResults evaluation={data.evaluation} score={data.score} />

      {/* 시장 분석 */}
      <MarketOverview
        marketTrends={data.market_trends}
        revenueBenchmarks={data.revenue_becnhmarks}
        ksic_hierarchy={data.ksic_hierarchy}
      />

      {/* 유사 서비스 분석 */}
      <SimilarServices
        similarServices={data.similar_services}
        score={data.score.simliar_service} // 오타 수정: simliar -> similar
      />

      {/* 주요 타겟 시장 */}
      <MainTarget targetMarkets={data.target_markets} />

      {/* 예상 비즈니스 모델 */}
      <ExpectedBM businessModel={data.business_model} />

      {/* 마케팅 전략 */}
      <MarketingStrategy marketingPlan={data.marketing_plan} />

      {/* 기회 요인  */}
      <Opportunities
        opportunities={data.opportunities}
        opportunityScore={data.score.opportunity}
        supportPrograms={data.support_programs}
      />

      {/* 팀 구성 및 제약사항*/}
      <TeamAndChallengers
        teamRequirements={data.team_requirements}
        limitations={data.limitations}
        riskScore={data.score.risk}
      />
    </Box>
  )
}

export default function AnalysisPage() {
  const projectId = ideaStore((state) => state.analysisResult?.id) || 0
  const { data, isLoading, error, refetch } = useGetIdeaOverview(projectId)
  const cookie = useGetCookie()?.data ?? null
  const router = useRouter()

  // Authentication check
  useEffect(() => {
    if (!cookie) {
      router.push('/login')
      return
    }
  }, [cookie, router])

  // Project ID validation
  useEffect(() => {
    if (!projectId && cookie) {
      router.push('/') // 또는 프로젝트 선택 페이지로 리다이렉트
    }
  }, [projectId, cookie, router])

  // Early return for auth/validation failures
  if (!cookie || !projectId) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
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
        minHeight: '100vh',
      }}
    >
      {/* Error handling */}
      {error && (
        <ErrorDisplay
          error="분석 결과를 불러오는데 실패했습니다."
          onRetry={() => refetch()}
        />
      )}

      {/* Loading state */}
      {isLoading && <LoadingSkeleton />}

      {/* Success state with data */}
      {data && !isLoading && !error && (
        <Suspense fallback={<LoadingSkeleton />}>
          <AnalysisContent data={data} />
        </Suspense>
      )}

      {/* Empty state - 데이터가 없고 로딩 중이 아니며 에러도 없는 경우 */}
      {!data && !isLoading && !error && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            gap: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            분석 결과가 없습니다.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            프로젝트를 다시 선택해주세요.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

// Optional: Export types for component props
export type AnalysisPageProps = {
  projectId?: number
}
