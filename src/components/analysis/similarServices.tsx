'use client'

import React, { useRef, RefObject, useState } from 'react'
import {
  Box,
  Typography,
  Card,
  Stack,
  Paper,
  IconButton,
  Dialog,
  Avatar,
  Link,
} from '@mui/material'
import { OpenInFull, Close } from '@mui/icons-material'
import { useDraggable } from '@/shared/api/useDraggalbe'

// 제공된 데이터 구조에 맞춘 타입 정의
type SimilarServiceItem = {
  description: string
  logo_url?: string
  website?: string
  tags: string[]
  summary: string
  name: string
}

type SimilarServicesProps = {
  similarServices: SimilarServiceItem[]
  score: number
}

export default function SimilarServices({
  similarServices,
  score,
}: SimilarServicesProps) {
  // 스크롤할 컨테이너에 대한 ref 생성
  const scrollerRef = useRef<HTMLElement>(null)

  // 팝업 상태 관리
  const [selectedService, setSelectedService] =
    useState<SimilarServiceItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // useDraggable 훅 사용
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } = useDraggable(
    scrollerRef as React.RefObject<HTMLElement>
  )

  // 팝업 열기
  const handleOpenDialog = (service: SimilarServiceItem) => {
    setSelectedService(service)
    setIsDialogOpen(true)
  }

  // 팝업 닫기
  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedService(null)
  }

  // 아이콘 버튼 클릭 핸들러 (드래그 이벤트 방지)
  const handleIconClick = (
    e: React.MouseEvent,
    service: SimilarServiceItem
  ) => {
    e.preventDefault()
    e.stopPropagation()
    handleOpenDialog(service)
  }

  // 데이터가 없는 경우
  if (!similarServices) {
    return null
  }

  // 점수만 있고 아이템이 없는 경우
  if (
    score !== undefined &&
    (!similarServices || similarServices.length === 0)
  ) {
    return (
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">유사 서비스</Typography>
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
      </Paper>
    )
  }

  // 점수는 없고 아이템만 있는 경우 또는 모두 있는 경우
  return (
    <>
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2" fontSize="1.5rem">
            🥊 유사 서비스
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
        {similarServices && similarServices.length > 0 ? (
          <Stack
            direction="row"
            spacing={2}
            ref={scrollerRef as RefObject<HTMLDivElement>}
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
            {similarServices.map((service, index) => (
              <Card
                key={index}
                sx={{
                  width: 280,
                  minWidth: 280,
                  flexShrink: 0,
                  borderRadius: 2,
                  height: 140,
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  position: 'relative',
                  overflow: 'hidden', // visible에서 hidden으로 변경
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden', // 추가
                  }}
                >
                  {/* 로고와 서비스명 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={service.logo_url}
                      sx={{
                        width: 24,
                        height: 24,
                        mr: 1,
                        bgcolor: '#007bff',
                        flexShrink: 0, // 추가
                      }}
                    >
                      ⭐
                    </Avatar>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: '#495057',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1,
                        pr: 5, // 확장 버튼 공간 확보
                      }}
                    >
                      {service.name}
                    </Typography>
                  </Box>

                  {/* 태그들 */}
                  <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '0.75rem',
                        color: '#6c757d',
                        lineHeight: 1.4,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3, // 최대 3줄 표시
                        WebkitBoxOrient: 'vertical',
                        wordBreak: 'break-word',
                        hyphens: 'auto',
                      }}
                    >
                      {service.tags?.length > 0
                        ? service.tags.map((tag) => `#${tag}`).join(' ')
                        : '#태그 없음'}
                    </Typography>
                  </Box>

                  {/* 확장 버튼 - 드래그 이벤트 차단 */}
                  <IconButton
                    onClick={(e) => handleIconClick(e, service)}
                    onMouseDown={(e) => {
                      e.stopPropagation() // 드래그 이벤트 차단
                    }}
                    sx={{
                      position: 'absolute',
                      top: 9,
                      right: 9,
                      width: 28,
                      height: 28,
                      backgroundColor: 'white',
                      border: '1px solid #dee2e6',
                      zIndex: 10, // 드래그 영역보다 위에 표시
                      '&:hover': {
                        backgroundColor: '#f8f9fa',
                      },
                    }}
                  >
                    <OpenInFull fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Stack>
        ) : (
          <></>
        )}
      </Paper>

      {/* 상세 정보 팝업 */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: '90vh',
          },
        }}
      >
        <Box sx={{ p: 3, position: 'relative' }}>
          {/* 닫기 버튼 */}
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: '#666',
            }}
          >
            <Close />
          </IconButton>

          {/* 헤더 영역 */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <Avatar
              src={selectedService?.logo_url}
              sx={{
                width: 80,
                height: 80,
                mr: 3,
                bgcolor: '#333',
                fontSize: '2rem',
              }}
            >
              {selectedService?.logo_url ? '' : ''}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  color: '#333',
                }}
              >
                {selectedService?.summary}
              </Typography>

              {/* 태그들 */}
              <Typography
                variant="body1"
                sx={{
                  color: '#666',
                  lineHeight: 1.6,
                  fontSize: '1rem',
                  wordBreak: 'break-word',
                }}
              >
                {selectedService?.tags?.map((tag) => `#${tag}`).join(' ') ||
                  '#태그 없음'}
              </Typography>
            </Box>
          </Box>

          {/* 서비스 설명 섹션 */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#333',
              }}
            >
              {selectedService?.summary}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                lineHeight: 1.8,
                fontSize: '0.95rem',
                wordBreak: 'break-word',
              }}
            >
              {selectedService?.description ||
                '서비스 설명이 제공되지 않았습니다.'}
            </Typography>
          </Box>

          {/* 웹사이트 링크 */}
          {selectedService?.website && (
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #eee' }}>
              <Link
                href={selectedService.website}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#1976d2',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                웹사이트 바로가기 →
              </Link>
            </Box>
          )}
        </Box>
      </Dialog>
    </>
  )
}
