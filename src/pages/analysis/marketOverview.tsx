'use client'

import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Stack,
} from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from 'recharts'

// API 응답 타입 정의
type MarketStats = {
  industry_path: string[]
  score: number
  market_trend: {
    domestic: Array<{
      year: number
      volume: number
      currency: string
      growth_rate: number
      source: string
    }>
    global: Array<{
      year: number
      volume: number
      currency: string
      growth_rate: number
      source: string
    }>
  }
  avg_revenue: {
    domestic: {
      amount: number
      currency: string
      source: string
    }
    global: {
      amount: number
      currency: string
      source: string
    }
  }
}

type MarketOverviewProps = {
  data?: MarketStats
}

// 통화 포맷팅 유틸리티 함수
const formatCurrency = (value: number, currency: string) => {
  if (currency === 'KRW') {
    // 한국 원화 포맷팅
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)} 십억원`
    } else {
      return `${(value / 1000000).toFixed(1)} 백만원`
    }
  } else if (currency === 'USD') {
    // 미국 달러 포맷팅
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)} B`
    } else {
      return `$${(value / 1000000).toFixed(1)} M`
    }
  }
  return `${value} ${currency}`
}

// 성장률 포맷팅
const formatGrowthRate = (rate: number) => {
  return `${(rate * 100).toFixed(1)}%`
}

export default function MarketOverview({ data }: MarketOverviewProps) {
  if (!data) {
    return null
  }

  // 국내 시장 차트 데이터
  const domesticChartData = data.market_trend.domestic.map((item) => ({
    year: item.year,
    volume: item.volume / 1000000000, // 가독성을 위해 십억 단위로 변환
    growth_rate: item.growth_rate * 100,
  }))

  // 글로벌 시장 차트 데이터
  const globalChartData = data.market_trend.global.map((item) => ({
    year: item.year,
    volume: item.volume / 1000000000, // 가독성을 위해 십억 단위로 변환
    growth_rate: item.growth_rate * 100,
  }))

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          📊 시장 개요
        </Typography>
      </Box>

      {/* 산업 분류 경로 */}
      <Box sx={{ mb: 3, ml: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          산업 분류
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {data.industry_path.map((industry, index) => (
            <Chip
              key={index}
              label={industry}
              color={
                index === data.industry_path.length - 1 ? 'primary' : 'default'
              }
              size="small"
            />
          ))}
        </Box>
      </Box>

      {/* 시장 트렌드 차트 - 분리된 그래프 */}
      <Stack spacing={4} sx={{ mb: 3, ml: 4 }}>
        {/* 국내 시장 차트 */}
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            국내 시장 규모 추이
          </Typography>
          <Box sx={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={domesticChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" name="시장 규모 (십억)" />
                <YAxis yAxisId="right" orientation="right" name="성장률 (%)" />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'volume')
                      return [`${value} 십억원`, '시장 규모']
                    if (name === 'growth_rate') return [`${value}%`, '성장률']
                    return [value, name]
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="volume"
                  name="시장 규모 (십억)"
                  fill="#4caf50"
                  barSize={30}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="growth_rate"
                  name="성장률 (%)"
                  stroke="#4caf50"
                  strokeDasharray="5 5"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* 글로벌 시장 차트 */}
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            글로벌 시장 규모 추이
          </Typography>
          <Box sx={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={globalChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" name="시장 규모 (십억)" />
                <YAxis yAxisId="right" orientation="right" name="성장률 (%)" />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'volume')
                      return [`${value} 십억$`, '시장 규모']
                    if (name === 'growth_rate') return [`${value}%`, '성장률']
                    return [value, name]
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="volume"
                  name="시장 규모 (십억)"
                  fill="#2196f3"
                  barSize={30}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="growth_rate"
                  name="성장률 (%)"
                  stroke="#2196f3"
                  strokeDasharray="5 5"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Stack>
    </Paper>
  )
}
