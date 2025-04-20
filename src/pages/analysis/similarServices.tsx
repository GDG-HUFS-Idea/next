'use client'

import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Chip,
  IconButton,
  Link,
  Stack,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

// API 응답 타입 정의
type SimilarServiceData = {
  score: number
  items: Array<{
    description: string
    logo_url?: string
    website_url?: string
    tags: string[]
    summary: string
  }>
}

type SimilarServicesProps = {
  data?: SimilarServiceData
}

export default function SimilarServices({ data }: SimilarServicesProps) {
  if (!data) {
    return null
  }
  console.log(data)

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
        <Box
          sx={{
            width: 24,
            height: 24,
            bgcolor: '#673ab7',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            borderRadius: '4px',
            mr: 1.5,
          }}
        >
          🔍
        </Box>
        <Typography variant="h6" fontWeight="bold">
          유사 서비스
        </Typography>
      </Box>

      {/* 유사 서비스 카드 */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
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
        {data.items.map((service, index) => (
          <Card key={index} variant="outlined" sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2, pb: 2, position: 'relative' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: '#e0e0e0',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mr: 1,
                    }}
                  >
                    {service.logo_url ? (
                      <img
                        src={service.logo_url}
                        alt="Service logo"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      '🏢'
                    )}
                  </Box>
                  <Typography
                    variant="subtitle2"
                    component={Link}
                    href={service.website_url || '#'}
                    target="_blank"
                    color="primary"
                  >
                    Service A
                  </Typography>
                </Box>
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* 서비스 태그 */}
              <Box
                sx={{ mb: 1.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
              >
                {service.tags.map((tag, tagIndex) => (
                  <Chip
                    key={tagIndex}
                    label={tag}
                    size="small"
                    sx={{
                      bgcolor: '#f5f5f5',
                      fontSize: '0.7rem',
                      height: 20,
                      '& .MuiChip-label': { px: 1 },
                    }}
                  />
                ))}
              </Box>

              {/* 서비스 설명 */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1, fontSize: '0.85rem' }}
              >
                {service.description}
              </Typography>

              {/* 서비스 요약 */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.8rem', fontStyle: 'italic' }}
              >
                {service.summary}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Paper>
  )
}
