'use client'

import React from 'react'
import { Box, Typography, Paper, Grid, Divider } from '@mui/material'

// API 응답 타입 정의
type TargetMarket = {
  target: string
  order: number
  reasons: string
  appeal: string
  online_activity: string
  online_channels: string
  offline_channels: string
}

type MainTargetProps = {
  data?: TargetMarket[]
}

export default function MainTarget({ data }: MainTargetProps) {
  if (!data || data.length === 0) {
    return null
  }

  // 순서에 따라 정렬
  const sortedTargets = [...data].sort((a, b) => a.order - b.order)

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" fontSize="1.5rem">
          👥 주 타겟층
        </Typography>
      </Box>

      {sortedTargets.map((target, index) => (
        <Box key={index} sx={{ mb: index < sortedTargets.length ? 5 : 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, ml: 4 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                bgcolor: '#e8eaf6',
                color: '#3f51b5',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                mr: 2,
              }}
            >
              {index + 1}
            </Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {target.target}
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ ml: 2 }}>
            <Grid item xs={12}>
              <Box sx={{ ml: 4, mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  타겟층 선정 이유
                </Typography>
                <Typography variant="body2" paragraph sx={{ ml: 2 }}>
                  {target.reasons}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ ml: 4, mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  흥미를 끄는 요소
                </Typography>
                <Typography variant="body2" paragraph sx={{ ml: 2 }}>
                  {target.appeal}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ ml: 4, mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  온라인 활동
                </Typography>
                <Typography variant="body2" paragraph sx={{ ml: 2 }}>
                  {target.online_activity}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ ml: 4, mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  주요 온라인 접점
                </Typography>
                <Typography variant="body2" paragraph sx={{ ml: 2 }}>
                  {target.online_channels}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ ml: 4, mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  주요 오프라인 접점
                </Typography>
                <Typography variant="body2" paragraph sx={{ ml: 2 }}>
                  {target.offline_channels}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {index < sortedTargets.length - 1 && (
            <Divider sx={{ my: 3, ml: 4 }} />
          )}
        </Box>
      ))}
    </Paper>
  )
}
