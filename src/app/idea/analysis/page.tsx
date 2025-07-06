'use client'

import React from 'react'
//import { useEffect } from 'react'
import { Box } from '@mui/material'
import AnalysisResults from '@/components/analysis/analysisResults'
import MarketOverview from '@/components/analysis/marketOverview'
import SimilarServices from '@/components/analysis/similarServices'
import ExpectedBM from '@/components/analysis/expectedBM'
import Opportunities from '@/components/analysis/opportunities'
import MainTarget from '@/components/analysis/mainTarget'
import MarketingStrategy from '@/components/analysis/marketingStrategy'
import TeamAndLimitations from '@/components/analysis/teamAndLimitations'
// import { useGetIdeaOverview } from '@/shared/api/idea/getIdeaOverview'
//import { ideaStore } from '@/shared/store/ideaStore'
// import { useGetCookie } from '@/shared/api/cookie'
//import { useRouter } from 'next/navigation'

export default function AnalysisPage() {
  // const projectId = ideaStore((state) => state.analysisResult?.id)
  // const { data } = useGetIdeaOverview(projectId)
  const data = {
    review:
      '개인화된 건강 데이터 분석과 코칭을 제공하고 있어 성장 가능성이 높은 아이템입니다. 최근 건강에 대한 관심 증가와 기술 발전으로 시장성이 높습니다.',
    project: {
      id: 1,
      name: 'AI 기반 건강관리 플랫폼',
    },
    market_stats: {
      industry_path: [
        '헬스케어',
        '디지털 헬스',
        '건강관리 서비스',
        'AI 기반 솔루션',
      ],
      score: 85,
      market_trend: {
        domestic: [
          {
            year: 2021,
            volume: 25000000000,
            currency: 'KRW',
            growth_rate: 0.22,
            source: 'https://example.com/korean-digital-health-2021',
          },
          {
            year: 2022,
            volume: 30000000000,
            currency: 'KRW',
            growth_rate: 0.2,
            source: 'https://example.com/korean-digital-health-2022',
          },
          {
            year: 2023,
            volume: 36000000000,
            currency: 'KRW',
            growth_rate: 0.28,
            source: 'https://example.com/korean-digital-health-2023',
          },
          {
            year: 2024,
            volume: 45000000000,
            currency: 'KRW',
            growth_rate: 0.25,
            source: 'https://example.com/korean-digital-health-2024',
          },
          {
            year: 2025,
            volume: 56000000000,
            currency: 'KRW',
            growth_rate: 0.24,
            source: 'https://example.com/korean-digital-health-forecast',
          },
        ],
        global: [
          {
            year: 2021,
            volume: 140000000000,
            currency: 'USD',
            growth_rate: 0.18,
            source: 'https://example.com/global-digital-health-2021',
          },
          {
            year: 2022,
            volume: 170000000000,
            currency: 'USD',
            growth_rate: 0.21,
            source: 'https://example.com/global-digital-health-2022',
          },
          {
            year: 2023,
            volume: 210000000000,
            currency: 'USD',
            growth_rate: 0.25,
            source: 'https://example.com/global-digital-health-2023',
          },
          {
            year: 2024,
            volume: 260000000000,
            currency: 'USD',
            growth_rate: 0.24,
            source: 'https://example.com/global-digital-health-2024',
          },
          {
            year: 2025,
            volume: 320000000000,
            currency: 'USD',
            growth_rate: 0.23,
            source: 'https://example.com/global-digital-health-forecast',
          },
        ],
      },
      avg_revenue: {
        domestic: {
          amount: 3500000000,
          currency: 'KRW',
          source: 'https://example.com/korean-health-tech-revenue-2021',
        },
        global: {
          amount: 28000000000,
          currency: 'USD',
          source: 'https://example.com/global-health-tech-revenue-2021',
        },
      },
    },
    similar_service: {
      score: 78,
      items: [
        {
          description: 'AI 기반 개인 맞춤형 다이어트 및 건강관리 플랫폼',
          logo_url: 'https://example.com/noom-logo.png',
          website_url: 'https://www.noom.com',
          tags: ['건강관리', '다이어트', 'AI 코칭', '습관 형성'],
          summary:
            'Noom은 심리학과 AI를 결합한 건강관리 앱으로, 사용자의 식습관과 운동 패턴을 분석하여 맞춤형 코칭을 제공합니다.',
        },
        {
          description: '개인화된 식단 추천과 영양 분석을 제공하는 건강관리 앱',
          logo_url: 'https://example.com/lifesum-logo.png',
          website_url: 'https://www.lifesum.com',
          tags: ['영양관리', '식단 추천', '건강 트래킹', '라이프스타일'],
          summary:
            'Lifesum은 사용자의 건강 목표와 선호도에 맞는 맞춤형 식단과 영양 조언을 제공하는 앱입니다.',
        },
      ],
    },
    support_programs: [
      {
        name: '디지털 헬스케어 스타트업 육성 프로그램',
        organizer: '한국보건산업진흥원',
        start_date: '2025-04-01T00:00:00.000Z',
        end_date: '2025-04-30T00:00:00.000Z',
      },
      {
        name: '2025 혁신의료기기 실증지원사업',
        organizer: '식품의약품안전처',
        start_date: '2025-05-15T00:00:00.000Z',
        end_date: '2025-06-15T00:00:00.000Z',
      },
    ],
    target_markets: [
      {
        target: '30-40대 건강관리에 관심 있는 직장인',
        order: 1,
        reasons:
          '건강관리 필요성은 인식하지만 시간적 여유가 부족한 집단, 디지털 기기 활용도가 높고 구매력이 있음',
        appeal: '바쁜 일상 속에서도 손쉽게 관리할 수 있는 맞춤형 건강 솔루션',
        online_activity:
          '유튜브에서 건강 콘텐츠 시청, 인스타그램에서 건강식품/운동 관련 계정 팔로우',
        online_channels: '인스타그램, 유튜브, 네이버/구글 검색',
        offline_channels: '헬스장/피트니스 센터, 건강검진센터',
      },
    ],
    business_model: {
      summary: '구독 기반 헬스케어 플랫폼',
      value_prop:
        '사용자의 건강 데이터를 AI로 분석하여 개인화된 건강관리 솔루션을 제공하는 플랫폼',
      revenue:
        '월 9,900원의 기본 구독료, 기본적인 건강 데이터 분석 및 리포트, 일일 건강 목표 설정 및 관리',
      investments: [
        {
          order: 1,
          section: '기술 개발',
          description: '개인화된 건강 분석 및 추천 엔진 개발',
        },
      ],
    },
    opportunity: {
      score: 90,
      items: [
        '글로벌 디지털 헬스케어 시장은 연평균 20% 이상의 성장률을 보이고 있으며, 코로나19 이후 원격 의료 및 건강관리에 대한 수요가 급증하고 있습니다.',
        '인공지능 기술의 발전으로 개인 건강 데이터 분석의 정확도가 높아지고, 맞춤형 건강 관리 솔루션 제공이 가능해졌습니다.',
      ],
    },
    limitation: {
      score: 65,
      items: [
        {
          category: '법률적 리스크',
          detail:
            '개인 건강 정보는 민감한 개인정보로 분류되어 엄격한 규제를 받음',
          impact:
            '각 국가별 의료 데이터 관련 법규를 위반할 경우 벌금 및 서비스 중단 위험 존재',
          solution:
            '개인정보 보호법 및 의료법 전문가 자문을 통한 법적 요건 충족',
        },
        {
          category: '지적재산권 리스크',
          detail: '건강 데이터 분석 알고리즘 관련 특허가 이미 존재할 가능성',
          impact: '특허 침해로 인한 법적 분쟁 및 개발 방향 수정 필요성 발생',
          solution: '사전 특허 조사와 회피 설계 진행',
        },
      ],
    },
    team_requirements: [
      {
        order: 1,
        title: 'AI 전문가',
        skill: '머신러닝, 데이터 분석, Python, TensorFlow/PyTorch',
        responsibility:
          '건강 데이터 분석 알고리즘 개발, 추천 시스템 구축, 데이터 파이프라인 설계',
      },
      {
        order: 2,
        title: '의학 전문가',
        skill: '내과학, 영양학, 예방의학, 건강관리',
        responsibility:
          '의학적 가이드라인 수립, 건강 콘텐츠 검증, 임상적 유효성 평가',
      },
    ],
  }
  // const cookie = useGetCookie()?.data ?? null
  //const router = useRouter()

  // useEffect(() => {
  //   if (!cookie) {
  //     router.push('/login')
  //   }
  // }, [cookie, router])

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

      <Opportunities data={data?.opportunity} />

      <TeamAndLimitations
        teamData={data?.team_requirements}
        limitationData={data?.limitation}
      />
    </Box>
  )
}
