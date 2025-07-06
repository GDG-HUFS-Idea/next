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
} from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import LightbulbIcon from '@mui/icons-material/Lightbulb'

// API 응답 타입 정의
type OpportunityData = {
  score: number
  items: string[]
}

type OpportunitiesProps = {
  data: OpportunityData | undefined
}

export default function Opportunities({ data }: OpportunitiesProps) {
  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" fontSize="1.5rem">
          ✨ 시장 기회
        </Typography>
      </Box>

      <Box sx={{ ml: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LightbulbIcon sx={{ color: '#4caf50', mr: 1 }} />
          <Typography variant="subtitle1" fontWeight="bold">
            기회 요인 (점수: {data?.score}/100)
          </Typography>
        </Box>

        <List dense disablePadding>
          {data?.items.map((item, index) => (
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
    </Paper>
  )
}
