'use client'

import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

// API 응답 타입 정의
type OpportunityData = {
  score: number
  items: string[]
}

type LimitationData = {
  score: number
  items: Array<{
    category: string
    detail: string
    impact: string
    solution: string
  }>
}

type OpportunitiesProps = {
  opportunityData?: OpportunityData
  limitationData?: LimitationData
}

export default function Opportunities({
  opportunityData,
  limitationData,
}: OpportunitiesProps) {
  if (!opportunityData && !limitationData) {
    return null
  }

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
        <Box
          sx={{
            width: 24,
            height: 24,
            bgcolor: '#4caf50',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            borderRadius: '4px',
            mr: 1.5,
          }}
        >
          ✨
        </Box>
        <Typography variant="h6" fontWeight="bold">
          시장 기회
        </Typography>
      </Box>

      {/* 기회 요인 섹션 */}
      {opportunityData && (
        <Box sx={{ ml: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LightbulbIcon sx={{ color: '#4caf50', mr: 1 }} />
            <Typography variant="subtitle1" fontWeight="bold">
              기회 요인 (점수: {opportunityData.score}/100)
            </Typography>
          </Box>

          <List dense disablePadding>
            {opportunityData.items.map((item, index) => (
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
      )}

      {/* 한계점 분석 섹션 */}
      {limitationData && (
        <Box sx={{ ml: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ErrorOutlineIcon sx={{ color: '#f44336', mr: 1 }} />
            <Typography variant="subtitle1" fontWeight="bold">
              한계점 분석 (점수: {limitationData.score}/100)
            </Typography>
          </Box>

          {limitationData.items.map((item, index) => (
            <Accordion
              key={index}
              sx={{ mb: 1, '&:before': { display: 'none' } }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip
                    label={item.category}
                    size="small"
                    sx={{
                      mr: 2,
                      bgcolor: 'rgba(244, 67, 54, 0.1)',
                      color: '#f44336',
                    }}
                  />
                  <Typography variant="body2" fontWeight="medium">
                    {item.detail}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      영향
                    </Typography>
                    <Typography variant="body2">{item.impact}</Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      해결책
                    </Typography>
                    <Typography variant="body2">{item.solution}</Typography>
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Paper>
  )
}
