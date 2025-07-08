'use client'

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  LinearProgress,
} from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
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

// Y축 범위와 간격을 계산하는 함수
const calculateYAxisConfig = (data: number[]) => {
  if (data.length === 0) {
    return { domain: [0, 10], ticks: [0, 2, 4, 6, 8, 10] } // Default for empty data
  }

  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)

  // Ensure min value is not negative and provides some buffer
  const finalMinValue = Math.max(0, minValue - (maxValue - minValue) * 0.1) // 10% buffer below min

  const range = maxValue - finalMinValue

  // let unitSize = 1
  // Find a suitable unit size (1, 2, 5, 10, 20, 50, 100, ...)
  const tickSteps = [1, 5, 10] // Common tick steps

  // Determine a base power of 10 for the unit size
  let powerOfTen = Math.pow(10, Math.floor(Math.log10(range / 5))) // Aim for 5 ticks initially

  let bestUnitSize = 0
  let minTickCount = Infinity

  for (const step of tickSteps) {
    const currentUnitSize = step * powerOfTen
    const currentTickCount =
      Math.ceil((maxValue - finalMinValue) / currentUnitSize) + 1

    // Ensure at least 2 ticks and not too many (e.g., max 10-15)
    if (currentTickCount >= 2 && currentTickCount <= 15) {
      if (currentTickCount < minTickCount) {
        minTickCount = currentTickCount
        bestUnitSize = currentUnitSize
      }
    }
  }

  // If no suitable unit size found with current powerOfTen, try next power of ten
  if (bestUnitSize === 0) {
    powerOfTen *= 10
    for (const step of tickSteps) {
      const currentUnitSize = step * powerOfTen
      const currentTickCount =
        Math.ceil((maxValue - finalMinValue) / currentUnitSize) + 1
      if (currentTickCount >= 2 && currentTickCount <= 15) {
        if (currentTickCount < minTickCount) {
          minTickCount = currentTickCount
          bestUnitSize = currentUnitSize
        }
      }
    }
  }

  // Fallback if still no good unit size (shouldn't happen often with reasonable data)
  if (bestUnitSize === 0) {
    bestUnitSize = Math.ceil(range / 5) // Simple fallback
    if (bestUnitSize === 0) bestUnitSize = 1 // Avoid zero
  }

  const maxRounded = Math.ceil(maxValue / bestUnitSize) * bestUnitSize
  const minRounded =
    (Math.floor(finalMinValue / bestUnitSize) * bestUnitSize) | 0

  const ticks: number[] = []
  for (let i: number = minRounded; i <= maxRounded; i += bestUnitSize) {
    ticks.push(i)
  }

  return {
    domain: [minRounded, maxRounded],
    ticks: ticks,
  }
}

// 매출 수준 바 컴포넌트
const RevenueProgressBar = ({
  label,
  value,
  color,
  maxValue,
}: {
  label: string
  value: number
  color: string
  maxValue: number
}) => {
  const percentage = (value / maxValue) * 100
  const displayValue = `$${(value / 1000000000).toFixed(0)}B`

  return (
    <Box sx={{ mb: 1.5, minWidth: 200 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 0.5,
        }}
      >
        <Typography variant="body1" sx={{ fontSize: '1rem', fontWeight: 500 }}>
          {label}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: '1rem', fontWeight: 'bold' }}
        >
          {displayValue}
        </Typography>
      </Box>
      <Box sx={{ position: 'relative' }}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: '#f5f5f5',
            '& .MuiLinearProgress-bar': {
              backgroundColor: color,
              borderRadius: 4,
            },
          }}
        />
      </Box>
    </Box>
  )
}

export default function MarketOverview({ data }: MarketOverviewProps) {
  const [industryInfoOpen, setIndustryInfoOpen] = useState(false)

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

  // Y축 설정 계산 - 적절한 단위로 설정
  const domesticVolumeConfig = calculateYAxisConfig(
    domesticChartData.map((item) => item.volume)
  )
  const domesticGrowthConfig = calculateYAxisConfig(
    domesticChartData.map((item) => item.growth_rate)
  )

  const globalVolumeConfig = calculateYAxisConfig(
    globalChartData.map((item) => item.volume)
  )
  const globalGrowthConfig = calculateYAxisConfig(
    globalChartData.map((item) => item.growth_rate)
  )

  // 매출 수준 바를 위한 최대값 계산
  const maxRevenue = Math.max(
    data.avg_revenue.domestic.amount,
    data.avg_revenue.global.amount
  )

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" fontSize="1.5rem">
          📊 시장 개요
        </Typography>
        <Box sx={{ minWidth: 500 }}>
          <RevenueProgressBar
            label="업계 평균 매출 수준 (국내)"
            value={data.avg_revenue.domestic.amount}
            color="#4caf50"
            maxValue={maxRevenue}
          />
          <RevenueProgressBar
            label="업계 평균 매출 수준 (글로벌)"
            value={data.avg_revenue.global.amount}
            color="#2196f3"
            maxValue={maxRevenue}
          />
        </Box>
      </Box>

      {/* 산업 분류 경로 */}
      <Box sx={{ mb: 3, ml: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant="subtitle1">산업 분류</Typography>
          <Tooltip title="산업 분류에 대한 자세한 정보">
            <IconButton
              size="small"
              onClick={() => setIndustryInfoOpen(true)}
              sx={{ padding: '2px' }}
            >
              <HelpOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
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
            국내 최근 5년 시장 동향
          </Typography>
          <Box sx={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={domesticChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis
                  yAxisId="left"
                  name="시장 규모 (십억)"
                  domain={domesticVolumeConfig.domain}
                  ticks={domesticVolumeConfig.ticks}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  name="성장률 (%)"
                  domain={domesticGrowthConfig.domain}
                  ticks={domesticGrowthConfig.ticks}
                />
                <RechartsTooltip
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
            글로벌 최근 5년 시장 동향
          </Typography>
          <Box sx={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={globalChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis
                  yAxisId="left"
                  name="시장 규모 (십억)"
                  domain={globalVolumeConfig.domain}
                  ticks={globalVolumeConfig.ticks}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  name="성장률 (%)"
                  domain={globalGrowthConfig.domain}
                  ticks={globalGrowthConfig.ticks}
                />
                <RechartsTooltip
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

      {/* 산업 분류 정보 다이얼로그 */}
      <Dialog
        open={industryInfoOpen}
        onClose={() => setIndustryInfoOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            📋 산업 분류 안내
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            산업 분류는 해당 비즈니스가 속하는 산업을 계층적으로 분류한
            것입니다.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            분류 체계 설명
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="대분류"
                secondary="가장 상위 수준의 산업 카테고리 (예: 제조업, 서비스업, IT업)"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="중분류"
                secondary="대분류를 세분화한 산업 분야 (예: 전자기기 제조, 소프트웨어 개발)"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="소분류"
                secondary="구체적인 사업 영역 (예: 스마트폰 제조, 모바일 앱 개발)"
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            현재 분석 대상의 산업 분류
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {data.industry_path.map((industry, index) => (
              <Chip
                key={index}
                label={`${index + 1}단계: ${industry}`}
                color={
                  index === data.industry_path.length - 1
                    ? 'primary'
                    : 'default'
                }
                variant={
                  index === data.industry_path.length - 1
                    ? 'filled'
                    : 'outlined'
                }
              />
            ))}
          </Box>

          <Typography variant="body2" color="text.secondary" paragraph>
            • 파란색 칩은 최종 분류 단계를 나타냅니다
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • 산업 분류는 시장 규모, 경쟁 환경, 규제 등을 분석하는 기준이 됩니다
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • 보다 세부적인 분류일수록 더 정확한 시장 분석이 가능합니다
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIndustryInfoOpen(false)}>확인</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}
