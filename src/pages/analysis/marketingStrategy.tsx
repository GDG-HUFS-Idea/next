'use client'

import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Chip,
  Stack,
} from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import BusinessIcon from '@mui/icons-material/Business'

// API 응답 타입 정의
type SupportProgram = {
  name: string
  organizer: string
  start_date?: string
  end_date?: string
}

type MarketingStrategyProps = {
  data?: SupportProgram[]
}

// 날짜 포맷팅 헬퍼 함수
const formatDate = (dateString?: string) => {
  if (!dateString) return '미정'

  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function MarketingStrategy({ data }: MarketingStrategyProps) {
  if (!data || data.length === 0) {
    return null
  }

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
        <Box
          sx={{
            width: 24,
            height: 24,
            bgcolor: '#ff9800',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            borderRadius: '4px',
            mr: 1.5,
          }}
        >
          📣
        </Box>
        <Typography variant="h6" fontWeight="bold">
          지원 프로그램
        </Typography>
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          ml: 2,
          flexWrap: { sm: 'wrap' },
          '& > *': {
            flex: {
              xs: '1 0 100%',
              sm: '1 0 calc(50% - 16px)',
              md: '1 0 calc(33.333% - 16px)',
            },
          },
        }}
      >
        {data.map((program, index) => (
          <Card key={index} variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                noWrap
              >
                {program.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
                <BusinessIcon
                  fontSize="small"
                  sx={{ color: 'text.secondary', mr: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {program.organizer}
                </Typography>
              </Box>

              {(program.start_date || program.end_date) && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarTodayIcon
                    fontSize="small"
                    sx={{ color: 'text.secondary', mr: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {program.start_date && program.end_date
                      ? `${formatDate(program.start_date)} ~ ${formatDate(
                          program.end_date
                        )}`
                      : program.start_date
                      ? `${formatDate(program.start_date)}부터`
                      : `${formatDate(program.end_date)}까지`}
                  </Typography>
                </Box>
              )}

              {/* 상태 칩: 날짜 기반 동적 표시 가능 */}
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Chip
                  label={
                    isCurrentlyOpen(program.start_date, program.end_date)
                      ? '현재 모집중'
                      : '준비중'
                  }
                  size="small"
                  color={
                    isCurrentlyOpen(program.start_date, program.end_date)
                      ? 'success'
                      : 'default'
                  }
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Paper>
  )
}

// 프로그램이 현재 지원 접수 중인지 확인하는 헬퍼 함수
function isCurrentlyOpen(startDate?: string, endDate?: string): boolean {
  if (!startDate && !endDate) return false

  const now = new Date()
  const start = startDate ? new Date(startDate) : new Date(0) // 시작일이 없으면 과거 날짜 사용
  const end = endDate ? new Date(endDate) : new Date('2099-12-31') // 종료일이 없으면 미래 날짜 사용

  return now >= start && now <= end
}
