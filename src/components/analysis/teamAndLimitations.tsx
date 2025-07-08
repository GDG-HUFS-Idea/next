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
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// API 응답 타입 정의
type TeamRequirement = {
  order: number
  title: string
  skill: string
  responsibility: string
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

type TeamAndLimitationsProps = {
  teamData?: TeamRequirement[]
  limitationData?: LimitationData
}

export default function TeamAndLimitations({
  teamData,
  limitationData,
}: TeamAndLimitationsProps) {
  // 클립보드에 복사 처리
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    // 여기에 복사 완료 알림 추가 가능 (Snackbar 등)
  }

  // 팀 채용 컴포넌트
  const TeamSection = () => {
    if (!teamData || teamData.length === 0) {
      return null
    }

    const sortedTeamReqs = [...teamData].sort((a, b) => a.order - b.order)

    return (
      <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" fontSize="1.5rem">
            👥 기술 / 인원 채용 사항
          </Typography>
        </Box>

        <Stack spacing={2} sx={{ ml: 2 }}>
          {sortedTeamReqs.map((requirement, index) => (
            <Card key={index} variant="outlined">
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
                  ></IconButton>
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

  // 한계점 분석 컴포넌트
  const LimitationSection = () => {
    if (!limitationData) {
      return null
    }

    return (
      <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" fontSize="1.5rem">
            ⚠️ 한계점 분석
          </Typography>
        </Box>

        <Box sx={{ ml: 2 }}>
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
                <Stack spacing={2}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      영향
                    </Typography>
                    <Typography variant="body2">{item.impact}</Typography>
                  </Box>
                  <Box>
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
      </Paper>
    )
  }

  // 둘 다 없으면 렌더링하지 않음
  if ((!teamData || teamData.length === 0) && !limitationData) {
    return null
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3}>
        {/* 팀 채용 섹션 */}
        {teamData && teamData.length > 0 && (
          <Grid item xs={12} lg={limitationData ? 6 : 12}>
            <TeamSection />
          </Grid>
        )}

        {/* 한계점 분석 섹션 */}
        {limitationData && (
          <Grid item xs={12} lg={teamData && teamData.length > 0 ? 6 : 12}>
            <LimitationSection />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
