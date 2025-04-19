'use client'

import React, { useState } from 'react'
import { Box, Typography, Card, Button, TextField } from '@mui/material'
import { styles } from '@/shared/ui/input/inputStyles'
import IdeaProcessing from './ideaProcessing'
import { usePostIdeaInput, IdeaData } from '@/shared/api/idea/ideaInput'
import { ideaStore } from '@/shared/store/ideaStore'

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
          alert('분석 요청 중 오류가 발생했습니다.')
        },
      })
    } catch (error) {
      // 예외 처리
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
          {/* 문제 및 솔루션 입력 카드 */}
          <Card sx={styles.card}>
            <Box sx={styles.section}>
              <Typography variant="h5" fontWeight="bold">
                🔹 Problem
              </Typography>
              <ul>
                <li>평소 불편함을 느꼈던 내용</li>
                <li>adsdsadsa</li>
                <li>asdas</li>
              </ul>
              <TextField
                multiline
                minRows={3}
                maxRows={10}
                variant="outlined"
                placeholder=""
                sx={styles.textField}
                value={problemText}
                onChange={handleProblemChange}
              />
            </Box>

            <Box sx={styles.section}>
              <Typography variant="h5" fontWeight="bold">
                💡 Solution
              </Typography>
              <ul>
                <li>해당 문제를 해결할 기술</li>
                <li>보다 구체적인 구현 방법</li>
              </ul>
              <TextField
                multiline
                minRows={3}
                maxRows={10}
                variant="outlined"
                placeholder=""
                sx={styles.textField}
                value={solutionText}
                onChange={handleSolutionChange}
              />
            </Box>
          </Card>

          <Box mt={3} sx={styles.buttonBox}>
            <Button
              variant="contained"
              sx={{
                ...styles.startButton,
                backgroundColor: '#4e73df', // 더 밝은 파란색
                '&:hover': {
                  backgroundColor: '#3a5dd0', // 호버 시 색상
                },
              }}
              disabled={isButtonDisabled}
              onClick={handleStartAnalysis}
              type="submit"
            >
              {isPending ? '요청 중...' : '분석 시작'}
            </Button>
          </Box>
          <Box sx={styles.analysisContainer}>
            <Card
              sx={{
                ...styles.analysisCard,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                📊 SWOT Analysis
              </Typography>
              <Typography variant="body2">
                Comprehensive analysis of Strengths, Weaknesses, Opportunities,
                and Threats
              </Typography>
            </Card>

            <Card
              sx={{
                ...styles.analysisCard,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                📈 Market Size
              </Typography>
              <Typography variant="body2">
                Detailed market analysis and potential
              </Typography>
            </Card>

            <Card
              sx={{
                ...styles.analysisCard,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                🏢 Competitor Analysis
              </Typography>
              <Typography variant="body2">
                Overview of similar services and competitive landscape
              </Typography>
            </Card>
          </Box>
        </Box>
      )}
    </>
  )
}

export default IdeaInput
