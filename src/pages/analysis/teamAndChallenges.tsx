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
  Divider,
  Stack,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import PersonIcon from '@mui/icons-material/Person'

// API 응답 타입 정의
type TeamRequirement = {
  order: number
  title: string
  skill: string
  responsibility: string
}

type TeamAndChallengersProps = {
  data?: TeamRequirement[]
}

export default function TeamAndChallengers({ data }: TeamAndChallengersProps) {
  if (!data || data.length === 0) {
    return null
  }

  // 순서대로 정렬
  const sortedTeamReqs = [...data].sort((a, b) => a.order - b.order)

  // 클립보드에 복사 처리
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    // 여기에 복사 완료 알림 추가 가능 (Snackbar 등)
  }

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          👥 기술 / 인원 채용 사항
        </Typography>
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          ml: 2,
          flexWrap: { sm: 'wrap' },
          '& > *': {
            flex: { xs: '1 0 100%', sm: '1 0 calc(50% - 16px)' },
          },
        }}
      >
        {sortedTeamReqs.map((requirement, index) => (
          <Card key={index} variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon
                    fontSize="small"
                    sx={{ mr: 1, color: '#9c27b0' }}
                  />
                  <Typography variant="subtitle1" fontWeight="bold">
                    {requirement.title}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={() =>
                    handleCopy(
                      `${requirement.title}\n\n역량: ${requirement.skill}\n\n담당 업무: ${requirement.responsibility}`
                    )
                  }
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Typography
                variant="subtitle2"
                gutterBottom
                color="text.secondary"
              >
                필요 역량
              </Typography>

              <Box sx={{ mb: 2 }}>
                {requirement.skill.split(',').map((skill, skillIndex) => (
                  <Chip
                    key={skillIndex}
                    label={skill.trim()}
                    size="small"
                    sx={{
                      mr: 0.5,
                      mb: 0.5,
                      bgcolor: 'rgba(156, 39, 176, 0.08)',
                    }}
                  />
                ))}
              </Box>

              <Typography
                variant="subtitle2"
                gutterBottom
                color="text.secondary"
              >
                담당 업무
              </Typography>
              <Typography variant="body2">
                {requirement.responsibility}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Paper>
  )
}
