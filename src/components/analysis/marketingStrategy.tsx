'use client'

import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Chip,
  Stack,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CampaignIcon from '@mui/icons-material/Campaign'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import MessageIcon from '@mui/icons-material/Message'
import TimelineIcon from '@mui/icons-material/Timeline'

// API 응답 타입 정의
type MarketingPlan = {
  approach: string
  budget: number
  channels: string[]
  kpis: string[]
  messages: string[]
  phase: {
    pre: string
    launch: string
    growth: string
  }
}

type MarketingStrategyProps = {
  marketingPlan?: MarketingPlan
}

// 예산 포맷팅 헬퍼 함수
const formatBudget = (amount: number) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function MarketingStrategy({
  marketingPlan,
}: MarketingStrategyProps) {
  if (!marketingPlan) {
    return null
  }

  const phases = [
    { key: 'pre', label: '사전 준비', description: marketingPlan.phase.pre },
    { key: 'launch', label: '런칭', description: marketingPlan.phase.launch },
    { key: 'growth', label: '성장', description: marketingPlan.phase.growth },
  ]

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          📣 마케팅 전략
        </Typography>
      </Box>

      {/* 접근 방식 */}
      <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1, ml: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {marketingPlan.approach}
        </Typography>
      </Box>

      <Box sx={{ ml: 2 }}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* 예산 */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AttachMoneyIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    마케팅 예산
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  {formatBudget(marketingPlan.budget)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* KPI 지표 */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    핵심 성과 지표 (KPI)
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {marketingPlan.kpis.map((kpi, index) => (
                    <Chip
                      key={index}
                      label={kpi}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 마케팅 채널 */}
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CampaignIcon color="secondary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                마케팅 채널
              </Typography>
            </Box>
            <List dense disablePadding>
              {marketingPlan.channels.map((channel, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon fontSize="small" color="success" />
                  </ListItemIcon>
                  <ListItemText primary={channel} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* 마케팅 메시지 */}
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MessageIcon color="info" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                핵심 메시지
              </Typography>
            </Box>
            <Stack spacing={1}>
              {marketingPlan.messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 1.5,
                    bgcolor: 'info.50',
                    borderRadius: 1,
                    borderLeft: '3px solid',
                    borderColor: 'info.main',
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    {message}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* 단계별 전략 */}
        <Card variant="outlined">
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TimelineIcon color="warning" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                단계별 마케팅 전략
              </Typography>
            </Box>
            <Stack spacing={2}>
              {phases.map((phase, index) => (
                <Box key={phase.key}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        bgcolor: 'warning.main',
                        color: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        mr: 2,
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {phase.label}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 4 }}
                  >
                    {phase.description}
                  </Typography>
                  {index < phases.length - 1 && <Divider sx={{ my: 1.5 }} />}
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Paper>
  )
}
