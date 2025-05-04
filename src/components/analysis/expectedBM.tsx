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
} from '@mui/material'

// API 응답 타입 정의
type BusinessModel = {
  summary: string
  value_prop: string
  revenue: string
  investments: Array<{
    order: number
    section: string
    description: string
  }>
}

type ExpectedBMProps = {
  data?: BusinessModel
}

export default function ExpectedBM({ data }: ExpectedBMProps) {
  if (!data) {
    return null
  }

  // 투자 우선순위 정렬
  const sortedInvestments = [...data.investments].sort(
    (a, b) => a.order - b.order
  )

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          💰 예상 BM
        </Typography>
      </Box>

      {/* 인용구 */}
      <Box
        sx={{
          bgcolor: '#f5f5f5',
          p: 2,
          borderLeft: '4px solid #2196f3',
          mb: 3,
          ml: 4,
          borderRadius: '0 4px 4px 0',
        }}
      >
        <Typography variant="body1" component="blockquote" fontStyle="italic">
          {data.summary}
        </Typography>
      </Box>

      {/* 비즈니스 모델 상세 */}
      <Box sx={{ ml: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          제품이 전달하는 가치
        </Typography>
        <Typography variant="body2" paragraph sx={{ ml: 2 }}>
          {data.value_prop}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          수익 구조
        </Typography>
        <Typography variant="body2" paragraph sx={{ ml: 2 }}>
          {data.revenue}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          투자 비용 우선 순위
        </Typography>

        <List dense disablePadding>
          {sortedInvestments.map((item, index) => (
            <ListItem key={index} alignItems="flex-start" sx={{ py: 1 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: '#e3f2fd',
                    color: '#2196f3',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {index + 1}
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={item.section}
                secondary={item.description}
                primaryTypographyProps={{
                  fontWeight: 'bold',
                  variant: 'body2',
                }}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  )
}
