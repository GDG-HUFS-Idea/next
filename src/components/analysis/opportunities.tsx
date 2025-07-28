'use client'

import React from 'react'
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
} from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import SupportIcon from '@mui/icons-material/Support'
import EventIcon from '@mui/icons-material/Event'

// API 응답 타입 정의
type SupportProgram = {
  name: string
  organizer: string
  start_date?: string
  end_date?: string
  url?: string
}

type OpportunitiesProps = {
  opportunities: string[]
  opportunityScore: number
  supportPrograms: SupportProgram[]
}

export default function Opportunities({
  opportunities,
  opportunityScore,
  supportPrograms,
}: OpportunitiesProps) {
  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" fontSize="1.5rem">
          ✨ 시장 기회
        </Typography>
      </Box>

      {/* 기회 요인 섹션 */}
      <Box sx={{ ml: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LightbulbIcon sx={{ color: '#4caf50', mr: 1 }} />
          <Typography variant="subtitle1" fontWeight="bold">
            기회 요인 (점수: {opportunityScore}/100)
          </Typography>
        </Box>

        <List dense disablePadding>
          {opportunities.map((item, index) => (
            <ListItem key={index} alignItems="flex-start" sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <ArrowRightIcon sx={{ color: '#4caf50' }} />
              </ListItemIcon>
              <ListItemText
                primary={item}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 지원 프로그램 섹션 */}
      <Box sx={{ ml: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SupportIcon sx={{ color: '#2196f3', mr: 1 }} />
          <Typography variant="subtitle1" fontWeight="bold">
            관련 지원 프로그램 ({supportPrograms.length}개)
          </Typography>
        </Box>

        <List dense disablePadding>
          {supportPrograms.map((program, index) => (
            <ListItem
              key={index}
              alignItems="flex-start"
              sx={{
                py: 1.5,
                flexDirection: 'column',
                alignItems: 'flex-start',
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                mb: 1,
                bgcolor: '#fafafa',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                  width: '100%',
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ flex: 1 }}
                >
                  {program.name}
                </Typography>
                <Chip
                  label={program.organizer}
                  size="small"
                  variant="outlined"
                  sx={{ bgcolor: 'white' }}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EventIcon sx={{ color: '#757575', fontSize: '1rem' }} />
                <Typography variant="caption" color="text.secondary">
                  {program.start_date} ~ {program.end_date}
                </Typography>
              </Box>

              {program.url && (
                <Typography
                  variant="caption"
                  color="primary"
                  sx={{
                    mt: 0.5,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    '&:hover': { color: 'primary.dark' },
                  }}
                  onClick={() => window.open(program.url, '_blank')}
                >
                  자세히 보기 →
                </Typography>
              )}
            </ListItem>
          ))}
        </List>

        {supportPrograms.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
          >
            현재 관련 지원 프로그램이 없습니다.
          </Typography>
        )}
      </Box>
    </Paper>
  )
}
