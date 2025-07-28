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
type MarketTrends = {
  domestic: Array<{
    year: number
    size: number
    currency: string
    growth_rate: number
    source: string
  }>
  global: Array<{
    year: number
    size: number
    currency: string
    growth_rate: number
    source: string
  }>
}

type RevenueBenchmarks = {
  domestic: {
    average_revenue: number
    currency: string
    source: string
  }
  global: {
    average_revenue: number
    currency: string
    source: string
  }
}

type KsicHierarchy = {
  large?: { code: string; name: string }
  medium?: { code: string; name: string }
  small?: { code: string; name: string }
  detail?: { code: string; name: string }
}

type MarketOverviewProps = {
  marketTrends?: MarketTrends
  revenueBenchmarks?: RevenueBenchmarks
  ksic_hierarchy?: KsicHierarchy
}

// Y축 범위와 간격을 계산하는 함수 (수정됨)
const calculateYAxisConfig = (data: number[]) => {
  if (!data || data.length === 0) {
    // 데이터가 없을 경우 합리적인 기본값 제공
    return { domain: [0, 10], ticks: [0, 2, 4, 6, 8, 10] }
  }

  let minValue = Math.min(...data)
  let maxValue = Math.max(...data)

  // 1. 모든 데이터 포인트가 동일한 엣지 케이스 처리
  if (minValue === maxValue) {
    const value = minValue
    if (value === 0) {
      return { domain: [0, 10], ticks: [0, 2, 4, 6, 8, 10] }
    }
    // 단일 값 주변에 적절한 범위 생성
    const padding = Math.abs(value) * 0.2 || 1
    minValue -= padding
    maxValue += padding
  }

  // 2. 적절한 간격(interval) 계산
  const range = maxValue - minValue
  const targetTickCount = 5 // 약 5개의 틱을 목표로 함
  // 목표 틱 카운트에 기반한 대략적인 간격
  const rawInterval = range > 0 ? range / (targetTickCount - 1) : 1

  // 3. 보기 좋은 'nice' 간격 계산 (예: 1, 2, 5, 10, 20, 50, ...)
  const exponent = Math.floor(Math.log10(rawInterval))
  const powerOf10 = Math.pow(10, exponent)
  const magnitude = rawInterval / powerOf10

  let niceInterval
  if (magnitude < 1.5) {
    niceInterval = 1 * powerOf10
  } else if (magnitude < 3) {
    niceInterval = 2 * powerOf10
  } else if (magnitude < 7) {
    niceInterval = 5 * powerOf10
  } else {
    niceInterval = 10 * powerOf10
  }

  // 4. 새로운 도메인(min/max)과 틱 계산
  // 도메인은 'nice' 간격의 배수에서 시작하고 끝나야 함
  let domainMin = Math.floor(minValue / niceInterval) * niceInterval
  const domainMax = Math.ceil(maxValue / niceInterval) * niceInterval

  // 원본 데이터가 모두 0 이상인 경우, Y축이 0 아래로 내려가지 않도록 보정
  if (Math.min(...data) >= 0) {
    domainMin = Math.max(0, domainMin)
  }

  const ticks = []
  let currentTick = domainMin
  // 부동 소수점 부정확성 문제를 피하기 위해 toPrecision 사용
  while (currentTick <= domainMax + niceInterval / 2) {
    ticks.push(parseFloat(currentTick.toPrecision(12)))
    currentTick += niceInterval
  }

  // 최종적으로 틱이 최소 2개는 있도록 보장
  if (ticks.length < 2) {
    if (ticks.length === 1) {
      ticks.push(parseFloat((ticks[0] + niceInterval).toPrecision(12)))
    } else {
      // 틱이 아예 없는 경우 (domainMin과 domainMax가 거의 같은 경우)
      ticks.push(domainMin)
      ticks.push(domainMax)
    }
  }

  return {
    domain: [domainMin, domainMax],
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
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0
  const displayValue =
    value > 0 ? `$${(value / 1000000000).toFixed(0)}B` : '데이터 없음'

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

export default function MarketOverview({
  marketTrends,
  revenueBenchmarks,
  ksic_hierarchy,
}: MarketOverviewProps) {
  const [industryInfoOpen, setIndustryInfoOpen] = useState(false)

  // ksic_hierarchy에서 name만 추출하여 배열로 만듦
  const industryPath = ksic_hierarchy
    ? [
        ksic_hierarchy.large?.name,
        ksic_hierarchy.medium?.name,
        ksic_hierarchy.small?.name,
        ksic_hierarchy.detail?.name,
      ].filter(Boolean)
    : undefined

  if (!marketTrends || !revenueBenchmarks) {
    return null
  }

  // 국내 시장 차트 데이터
  const domesticChartData = marketTrends.domestic.map((item) => ({
    year: item.year,
    size: item.size / 1000000000, // 가독성을 위해 십억 단위로 변환
    growth_rate: item.growth_rate,
  }))

  // 글로벌 시장 차트 데이터
  const globalChartData = marketTrends.global.map((item) => ({
    year: item.year,
    size: item.size / 1000000000, // 가독성을 위해 십억 단위로 변환
    growth_rate: item.growth_rate,
  }))

  // Y축 설정 계산 - 적절한 단위로 설정
  const domesticSizeConfig = calculateYAxisConfig(
    domesticChartData.map((item) => item.size)
  )
  const domesticGrowthConfig = calculateYAxisConfig(
    domesticChartData.map((item) => item.growth_rate)
  )

  const globalSizeConfig = calculateYAxisConfig(
    globalChartData.map((item) => item.size)
  )
  const globalGrowthConfig = calculateYAxisConfig(
    globalChartData.map((item) => item.growth_rate)
  )

  // 매출 수준 바를 위한 최대값 계산
  const maxRevenue = Math.max(
    revenueBenchmarks.domestic.average_revenue,
    revenueBenchmarks.global.average_revenue
  )

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
      {/* 헤더 섹션 */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          fontSize="1.5rem"
          sx={{ mb: 2 }}
        >
          📊 시장 개요
        </Typography>

        {/* 상단 정보 섹션 - 산업 분류와 매출 수준을 나란히 배치 */}
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            pb: 10,
            pt: 5,
          }}
        >
          {/* 산업 분류 섹션 */}
          {industryPath && (
            <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
              >
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
                {industryPath.map((industry, index) => (
                  <Chip
                    key={index}
                    label={industry}
                    color={
                      index === industryPath.length - 1 ? 'primary' : 'default'
                    }
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* 매출 수준 섹션 */}
          <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
            <RevenueProgressBar
              label="업계 평균 매출 수준 (국내)"
              value={revenueBenchmarks.domestic.average_revenue}
              color="#4caf50"
              maxValue={maxRevenue}
            />
            <RevenueProgressBar
              label="업계 평균 매출 수준 (글로벌)"
              value={revenueBenchmarks.global.average_revenue}
              color="#2196f3"
              maxValue={maxRevenue}
            />
          </Box>
        </Box>
      </Box>

      {/* 시장 트렌드 차트 섹션 */}
      <Stack spacing={4} sx={{ mb: 3 }}>
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
                  domain={domesticSizeConfig.domain}
                  ticks={domesticSizeConfig.ticks}
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
                    if (name === 'size') return [`${value} 십억원`, '시장 규모']
                    if (name === 'growth_rate') return [`${value}%`, '성장률']
                    return [value, name]
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="size"
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
                  domain={globalSizeConfig.domain}
                  ticks={globalSizeConfig.ticks}
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
                    if (name === 'size') return [`${value} 십억$`, '시장 규모']
                    if (name === 'growth_rate') return [`${value}%`, '성장률']
                    return [value, name]
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="size"
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
          {industryPath && (
            <>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {industryPath.map((industry, index) => (
                  <Chip
                    key={index}
                    label={`${index + 1}단계: ${industry}`}
                    color={
                      index === industryPath.length - 1 ? 'primary' : 'default'
                    }
                    variant={
                      index === industryPath.length - 1 ? 'filled' : 'outlined'
                    }
                  />
                ))}
              </Box>
            </>
          )}

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
