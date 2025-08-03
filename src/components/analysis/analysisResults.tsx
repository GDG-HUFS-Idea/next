'use client'

import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Stack,
  Tooltip,
  IconButton,
  Divider,
} from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

// 새로운 데이터 구조에 맞춘 타입 정의
type AnalysisResultsProps = {
  evaluation?: string
  score?: {
    market: number
    opportunity: number
    risk: number
    simliar_service: number
  }
  marketTrends?: {
    domestic: Array<{
      year: number
      size: number
      currency: string
      growth_rate: number
    }>
    global: Array<{
      year: number
      size: number
      currency: string
      growth_rate: number
    }>
  }
}

export default function AnalysisResults({
  evaluation,
  score,
}: AnalysisResultsProps) {
  if (!evaluation && !score) {
    return null
  }

  // 점수 설명 데이터
  const scoreDescriptions = {
    '시장 규모':
      '시장 규모, 성장률, 경쟁 강도 등을 종합적으로 분석한 점수입니다.',
    기회: '시장 진입 타이밍, 고객 니즈, 성장 잠재력을 분석한 점수입니다.',
    '유사 서비스':
      '기존 경쟁사 현황, 차별화 가능성, 시장 포화도를 평가한 점수입니다.',
    위험성: '기술적/재정적 제약, 규제 환경, 리스크 요소를 평가한 점수입니다.',
  }

  // 점수 데이터 (figma 순서에 맞게)
  const scoreItems = [
    {
      name: '시장 규모',
      score: score?.market || 80,
      icon: '📊',
      color: '#ffebee',
    },
    {
      name: '기회',
      score: score?.opportunity || 92,
      icon: '💡',
      color: '#fff3e0',
    },
    {
      name: '유사 서비스',
      score: score?.simliar_service || 61,
      icon: '🔍',
      color: '#e8f5e8',
    },
    {
      name: '위험성',
      score: score?.risk || 72,
      icon: '👁',
      color: '#f3e5f5',
    },
  ]

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        backgroundColor: '#fafafa',
        border: '1px solid #e0e0e0',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        fontWeight="bold"
        sx={{ mb: 3 }}
      >
        Analysis Results
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        {/* 왼쪽 - 총평 */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                py: 0.5,
                borderRadius: 1,
                fontSize: '1.5rem',
                fontWeight: 'medium',
              }}
            >
              📝 총평
            </Box>
          </Box>

          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.7,
              color: '#333',
              fontSize: '1.2rem',
              px: 2,
            }}
          >
            {evaluation ||
              '제안하신 아이디어는 ~~~~~/~~~~ 요소가 강점이 될 수 있고, ~~~ 부분에 위험성을 가지고 있습니다. 시장의 진출 타이밍은 하반기가 적절해보입니다.'}
          </Typography>
        </Box>

        {/* 오른쪽 - 분석 점수 */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 2, textAlign: 'right' }}
          >
            분석 점수
          </Typography>

          {/* 점수 리스트 */}
          <Stack spacing={2} sx={{ mb: 3 }}>
            {scoreItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  backgroundColor: item.color,
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                    {item.icon}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="medium"
                    sx={{ color: '#333' }}
                  >
                    {item.name}
                  </Typography>
                  <Tooltip
                    title={
                      scoreDescriptions[
                        item.name as keyof typeof scoreDescriptions
                      ]
                    }
                    arrow
                    placement="top"
                  >
                    <IconButton size="small" sx={{ p: 0.3 }}>
                      <HelpOutlineIcon sx={{ fontSize: 14, color: '#999' }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ color: '#333' }}
                >
                  {item.score} / 100
                </Typography>
              </Box>
            ))}
          </Stack>

          <Divider sx={{ mb: 2 }} />
        </Box>
      </Stack>
    </Paper>
  )
}
