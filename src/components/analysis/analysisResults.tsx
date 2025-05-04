'use client'

import React from 'react'
import { Box, Typography, Paper, Card, CardContent, Stack } from '@mui/material'

// API 응답 타입 정의
type AnalysisResultsProps = {
  data?: {
    review: string
    project: {
      id: number
      name: string
    }
    market_stats: {
      score: number
      market_trend: {
        domestic: Array<{
          year: number
          volume: number
          currency: string
          growth_rate: number
        }>
        global: Array<{
          year: number
          volume: number
          currency: string
          growth_rate: number
        }>
      }
    }
    similar_service: {
      score: number
    }
    opportunity: {
      score: number
    }
    limitation: {
      score: number
    }
  }
}

const formatCurrency = (value: number, currency: string) => {
  if (currency === 'KRW') {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)} 십억원`
    } else {
      return `${(value / 1000000).toFixed(1)} 백만원`
    }
  } else if (currency === 'USD') {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)} B`
    } else {
      return `$${(value / 1000000).toFixed(1)} M`
    }
  }
  return `${value} ${currency}`
}

export default function AnalysisResults({ data }: AnalysisResultsProps) {
  if (!data) {
    return null
  }

  // 점수 데이터
  const scoreItems = [
    {
      name: '시장 점수',
      score: data.market_stats?.score || 0,
      color:
        data.market_stats?.score > 80
          ? '#f7b500'
          : data.market_stats?.score > 60
          ? '#ffce52'
          : '#fdde89',
    },
    {
      name: '유사 서비스',
      score: data.similar_service?.score || 0,
      color:
        data.similar_service?.score > 80
          ? '#f7b500'
          : data.similar_service?.score > 60
          ? '#ffce52'
          : '#fdde89',
    },
    {
      name: '시장 기회',
      score: data.opportunity?.score || 0,
      color:
        data.opportunity?.score > 80
          ? '#8fd14f'
          : data.opportunity?.score > 60
          ? '#a9dc71'
          : '#c3e79b',
    },
    {
      name: '한계점',
      score: data.limitation?.score || 0,
      color:
        data.limitation?.score > 80
          ? '#7272c7'
          : data.limitation?.score > 60
          ? '#9292d5'
          : '#b1b1e3',
    },
  ]

  // 마지막 데이터 포인트에서 시장 규모 값 가져오기
  const domesticData = data.market_stats?.market_trend?.domestic || []
  const globalData = data.market_stats?.market_trend?.global || []
  const lastDomesticVolume =
    domesticData.length > 0 ? domesticData[domesticData.length - 1].volume : 0
  const lastGlobalVolume =
    globalData.length > 0 ? globalData[globalData.length - 1].volume : 0
  const lastDomesticCurrency =
    domesticData.length > 0
      ? domesticData[domesticData.length - 1].currency
      : 'KRW'
  const lastGlobalCurrency =
    globalData.length > 0 ? globalData[globalData.length - 1].currency : 'USD'

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
        Analysis Results
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        {/* 왼쪽 - 리뷰 & 차트 */}
        <Box sx={{ flex: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              👍 간략평
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ ml: 4, mb: 3 }}>
            {data.review || '분석결과가 아직 없습니다.'}
          </Typography>
        </Box>

        {/* 오른쪽 - 점수 */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              분석 총 점수
            </Typography>

            {/* 점수 카드 */}
            <Stack spacing={2}>
              {scoreItems.map((item, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  sx={{ backgroundColor: item.color }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {item.name}
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {item.score} / 100
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>

          {/* 시장 트렌드 바 */}
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
                backgroundColor: 'yellowgreen',
              }}
            >
              <Typography variant="body2">
                국내 시장 기회 지수 (5/10)
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {formatCurrency(lastDomesticVolume, lastDomesticCurrency)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
                backgroundColor: 'skyblue',
              }}
            >
              <Typography variant="body2">
                글로벌 시장 기회 지수 (5/10)
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {formatCurrency(lastGlobalVolume, lastGlobalCurrency)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Paper>
  )
}
