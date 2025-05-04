'use client'

import ShowChartIcon from '@mui/icons-material/ShowChart'

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  Button,
  TextField,
  Stack,
  Paper,
} from '@mui/material'
import { usePostIdeaInput, IdeaData } from '@/shared/api/idea/ideaInput'
import { ideaStore } from '@/shared/store/ideaStore'
import IdeaProcessing from './ideaProcessing'
import SettingsIcon from '@mui/icons-material/Settings'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import AssessmentIcon from '@mui/icons-material/Assessment'
import BusinessIcon from '@mui/icons-material/Business'
import SendIcon from '@mui/icons-material/Send'
import { styles } from '@/shared/ui/input/inputStyles'

const IdeaInput: React.FC = () => {
  const [problemText, setProblemText] = useState('') // 문제 입력 상태
  const [solutionText, setSolutionText] = useState('') // 솔루션 입력 상태
  const [isProcessing, setIsProcessing] = useState(false)
  const [taskId, setTaskId] = useState<string | null>(null)

  // Zustand 스토어의 setTaskId 함수 가져오기
  const setStoreTaskId = ideaStore((store) => store.setTaskId)

  // TanStack Query의 useMutation 훅 사용
  const { mutate, isPending } = usePostIdeaInput()

  // 입력 필드 변경 핸들러
  const handleProblemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProblemText(event.target.value)
  }

  const handleSolutionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSolutionText(event.target.value)
  }

  // 분석 시작 핸들러
  const handleStartAnalysis = () => {
    const data: IdeaData = { problem: problemText, solution: solutionText }

    try {
      mutate(data, {
        onSuccess: (response) => {
          // task_id 저장 (즉시 폴링 시작을 위해)
          const newTaskId = response.task_id
          setTaskId(newTaskId)

          // Zustand 스토어에도 저장
          setStoreTaskId(newTaskId)

          // 처리 중 상태로 즉시 변경
          setIsProcessing(true)
        },
        onError: (error) => {
          alert('분석 요청 중 오류가 발생했습니다.' + error)
        },
      })
    } catch (error) {
      // 예외 처리
      console.error('Error during mutation:', error)
    }
  }

  // 버튼 활성화 조건: 두 입력 필드 모두 값이 있고, 현재 mutation이 진행 중이 아닐 때
  const isButtonDisabled =
    !problemText.trim() || !solutionText.trim() || isPending

  // 사용자 이름 (여기서는 예시로만 사용, 실제로는 인증 시스템에서 가져옴)
  const username = '홍길동' // 실제 구현 시 사용자 정보에서 가져옴

  return (
    <>
      {isProcessing && taskId ? (
        <IdeaProcessing taskId={taskId} username={username} />
      ) : (
        <Box sx={styles.container}>
          {/* 메인 카드 */}
          <Paper elevation={0} sx={styles.mainCard}>
            {/* Problem 섹션 */}
            <Box sx={styles.section}>
              <Typography variant="h5" sx={styles.sectionTitle}>
                <SettingsIcon /> Problem
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                <Typography component="li" sx={styles.listItem}>
                  평소 불편함을 느꼈던 기존 문제점이나 불편함
                </Typography>
                <Typography component="li" sx={styles.listItem}>
                  문제를 해결하고자 하는 개발 동기
                </Typography>
              </Box>
              <TextField
                multiline
                minRows={3}
                maxRows={10}
                variant="outlined"
                placeholder="문제점과 개발 동기를 자세히 작성해주세요"
                sx={styles.textField}
                value={problemText}
                onChange={handleProblemChange}
              />
            </Box>

            {/* Solution 섹션 */}
            <Box sx={styles.section}>
              <Typography variant="h5" sx={styles.sectionTitle}>
                <LightbulbIcon /> Solution
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                <Typography component="li" sx={styles.listItem}>
                  아이디어의 핵심 요소(기능, 특징)
                </Typography>
                <Typography component="li" sx={styles.listItem}>
                  문제를 해결하기 위한 방법이나 접근 방식(기술, 프로세스)
                </Typography>
                <Typography component="li" sx={styles.listItem}>
                  최종 결과물(제품/서비스)의 형태
                </Typography>
              </Box>
              <TextField
                multiline
                minRows={3}
                maxRows={10}
                variant="outlined"
                placeholder="해결 방안을 구체적으로 작성해주세요"
                sx={styles.textField}
                value={solutionText}
                onChange={handleSolutionChange}
              />
            </Box>

            {/* 버튼 */}
            <Box sx={styles.buttonContainer}>
              <Button
                variant="contained"
                sx={styles.startButton}
                disabled={isButtonDisabled}
                onClick={handleStartAnalysis}
                endIcon={<SendIcon />}
              >
                {isPending ? '요청 중...' : '분석 시작'}
              </Button>
            </Box>
          </Paper>

          {/* 분석 카드 세트 */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            sx={styles.analysisContainer}
          >
            <Card sx={styles.analysisCard}>
              <AssessmentIcon sx={styles.analysisIcon} />
              <Typography variant="h6" sx={styles.analysisTitle}>
                SWOT Analysis
              </Typography>
              <Typography variant="body2" sx={styles.analysisDesc}>
                Comprehensive analysis of Strengths, Weaknesses, Opportunities,
                and Threats
              </Typography>
            </Card>

            <Card sx={styles.analysisCard}>
              <ShowChartIcon sx={styles.analysisIcon} />
              <Typography variant="h6" sx={styles.analysisTitle}>
                Market Size
              </Typography>
              <Typography variant="body2" sx={styles.analysisDesc}>
                Detailed market analysis and potential
              </Typography>
            </Card>

            <Card sx={styles.analysisCard}>
              <BusinessIcon sx={styles.analysisIcon} />
              <Typography variant="h6" sx={styles.analysisTitle}>
                Competitor Analysis
              </Typography>
              <Typography variant="body2" sx={styles.analysisDesc}>
                Overview of similar services and competitive landscape
              </Typography>
            </Card>
          </Stack>
        </Box>
      )}
    </>
  )
}

export default IdeaInput
