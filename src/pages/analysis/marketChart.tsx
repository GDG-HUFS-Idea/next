'use client'

import React from 'react'
import { Box, Card, Typography, Stack, Chip } from '@mui/material'
import {
  ChartContainer,
  BarPlot,
  LinePlot,
  ChartsXAxis,
  ChartsYAxis,
} from '@mui/x-charts'
import { styles } from '../../shared/ui/analysis/chartStyles'

const years = ['2020', '2021', '2022', '2023', '2024']

const legendItems = [
  { label: '국내 시장 규모', color: '#4CAF50' },
  { label: '국내 성장률 (%)', color: '#2196F3' },
  { label: '글로벌 시장 규모', color: '#FF9800' },
  { label: '글로벌 성장률 (%)', color: '#E91E63' },
]

const MarketChart: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
        justifyContent: 'center',
      }}
    >
      {/* 국내 시장 동향 */}
      <Card sx={styles.chartCard}>
        <Typography variant="h6" sx={styles.chartTitle}>
          📊 국내 시장 동향
        </Typography>
        <ChartContainer
          width={550}
          height={350}
          xAxis={[
            {
              id: 'x-axis',
              scaleType: 'band',
              data: years,
              label: '연도',
              tickLabelPlacement: 'middle',
            },
          ]}
          yAxis={[
            {
              id: 'left-axis',
              position: 'left',
              label: '시장 규모 (억 원)',
              scaleType: 'linear',
              min: 0,
              max: 70,
            },
            {
              id: 'right-axis',
              position: 'right',
              label: '성장률 (%)',
              scaleType: 'linear',
              min: 0,
              max: 10,
            },
          ]}
          series={[
            {
              type: 'bar',
              data: [40, 50, 45, 60, 55],
              label: '국내 시장 규모',
              color: '#4CAF50',
              yAxisKey: 'left-axis', // ✅ 왼쪽 Y축에 반영
            },
            {
              type: 'line',
              data: [5, 6, 5.5, 7, 6.5],
              label: '국내 성장률 (%)',
              color: '#2196F3',
              yAxisKey: 'right-axis', // ✅ 오른쪽 Y축에 반영
            },
          ]}
        >
          <ChartsXAxis />
          <ChartsYAxis axisId="left-axis" position="left" />
          <ChartsYAxis axisId="right-axis" position="right" />
          <BarPlot borderRadius={0.3} />
          <LinePlot />
        </ChartContainer>

        {/* ✅ 범례 추가 */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          {legendItems.slice(0, 2).map((item) => (
            <Chip
              key={item.label}
              label={item.label}
              sx={{ backgroundColor: item.color, color: 'white' }}
            />
          ))}
        </Stack>
      </Card>

      {/* 글로벌 시장 동향 */}
      <Card sx={styles.chartCard}>
        <Typography variant="h6" sx={styles.chartTitle}>
          🌍 글로벌 시장 동향
        </Typography>
        <ChartContainer
          width={550}
          height={350}
          xAxis={[
            {
              id: 'x-axis',
              scaleType: 'band',
              data: years,
              label: '연도',
              tickLabelPlacement: 'middle',
            },
          ]}
          yAxis={[
            {
              id: 'left-axis-global',
              position: 'left',
              label: '시장 규모 (십억 달러)',
              scaleType: 'linear',
              min: 0,
              max: 100,
            },
            {
              id: 'right-axis-global',
              position: 'right',
              label: '성장률 (%)',
              scaleType: 'linear',
              min: 0,
              max: 10,
            },
          ]}
          series={[
            {
              type: 'bar',
              data: [60, 65, 70, 80, 85],
              label: '글로벌 시장 규모',
              color: '#FF9800',
              yAxisKey: 'left-axis-global', // ✅ 왼쪽 Y축에 반영
            },
            {
              type: 'line',
              data: [4.5, 5.2, 6, 6.8, 7.5],
              label: '글로벌 성장률 (%)',
              color: '#E91E63',
              yAxisKey: 'right-axis-global', // ✅ 오른쪽 Y축에 반영
            },
          ]}
        >
          <ChartsXAxis />
          <ChartsYAxis axisId="left-axis-global" position="left" />
          <ChartsYAxis axisId="right-axis-global" position="right" />
          <BarPlot borderRadius={0.3} />
          <LinePlot />
        </ChartContainer>

        {/* ✅ 범례 추가 */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          {legendItems.slice(2, 4).map((item) => (
            <Chip
              key={item.label}
              label={item.label}
              sx={{ backgroundColor: item.color, color: 'white' }}
            />
          ))}
        </Stack>
      </Card>
    </Box>
  )
}

export default MarketChart
