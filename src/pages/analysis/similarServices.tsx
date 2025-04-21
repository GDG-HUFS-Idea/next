'use client'

import React, { useRef } from 'react'
import { Box, Typography, Card, Stack, Alert, Paper } from '@mui/material'
import { useDraggable } from '@/shared/api/useDraggalbe'

// 제공된 데이터 구조에 맞춘 타입 정의
type SimilarServiceItem = {
  description: string
  logo_url?: string
  website_url?: string
  tags: string[]
  summary: string
}

type SimilarServiceData = {
  score?: number
  items?: SimilarServiceItem[]
}

type SimilarServicesProps = {
  data?: {
    similar_service?: SimilarServiceData
  }
}

export default function SimilarServices({ data }: SimilarServicesProps) {
  // 스크롤할 컨테이너에 대한 ref 생성
  const scrollerRef = useRef<HTMLDivElement>(null)

  // useDraggable 훅 사용
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef)

  // 데이터가 없는 경우
  if (!data || !data.similar_service) {
    return (
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            유사 서비스
          </Typography>
        </Box>
        <Alert severity="info" sx={{ mt: 1 }}>
          유사 서비스 데이터가 없습니다.
        </Alert>
      </Paper>
    )
  }

  const { score, items } = data.similar_service

  // 점수만 있고 아이템이 없는 경우
  if (score !== undefined && (!items || items.length === 0)) {
    return (
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              color: '#333',
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
          >
            유사 서비스
          </Typography>
          <Typography
            variant="body2"
            component="span"
            sx={{
              ml: 2,
              color: '#666',
              fontSize: '1rem',
            }}
          >
            점수: {score}/100
          </Typography>
        </Box>
        <Alert severity="info" sx={{ mt: 1 }}>
          유사 서비스 상세 데이터가 없습니다.
        </Alert>
      </Paper>
    )
  }

  // 점수는 없고 아이템만 있는 경우 또는 모두 있는 경우
  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          component="span"
          sx={{
            bgcolor: '#3366ff',
            color: 'white',
            width: 32,
            height: 32,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '4px',
            mr: 1,
            fontSize: '1.25rem',
          }}
        >
          유
        </Box>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: '#333',
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          유사 서비스
        </Typography>
        {score !== undefined && (
          <Typography
            variant="body2"
            component="span"
            sx={{
              ml: 2,
              color: '#666',
              fontSize: '1rem',
            }}
          >
            점수: {score}/100
          </Typography>
        )}
      </Box>

      {/* 드래그 가능한 스크롤 컨테이너 */}
      {items && items.length > 0 ? (
        <Stack
          direction="row"
          spacing={2}
          ref={scrollerRef}
          sx={{
            width: '100%',
            overflowX: 'auto',
            cursor: 'grab',
            pb: 2,
            '&:active': {
              cursor: 'grabbing',
            },
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          {items.map((service, index) => (
            <Card
              key={index}
              sx={{
                width: 300,
                minWidth: 300,
                bgcolor: '#000000',
                color: 'white',
                flexShrink: 0,
                borderRadius: 0,
                pointerEvents: 'none', // 카드 내부 요소에 대한 마우스 이벤트 방지
                height: 'auto', // 자동 높이 설정
                minHeight: 180, // 최소 높이 설정
              }}
            >
              <Box
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start', // 상단부터 컨텐츠 시작
                  p: 2,
                }}
              >
                <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                  {/* 요약에서 앱 이름만 추출 (예: "Noom은..." -> "Noom") */}
                  {service.summary?.split('은')[0]?.split('는')[0] || '서비스'}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.85rem', mb: 1 }}>
                  {service.description || '설명 없음'}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: '0.75rem', color: '#aaa' }}
                >
                  {service.tags?.length > 0
                    ? service.tags.map((tag) => `#${tag} `)
                    : '#태그 없음'}
                </Typography>
              </Box>
            </Card>
          ))}
        </Stack>
      ) : (
        <Alert severity="info" sx={{ mt: 1 }}>
          유사 서비스 아이템 데이터가 없습니다.
        </Alert>
      )}
    </Paper>
  )
}
