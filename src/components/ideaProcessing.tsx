'use client'

import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import { processingStyles } from '@/shared/ui/input/processingStyles'
import { useIdeaStatus } from '@/shared/api/idea/ideaInput'
import { useRouter } from 'next/navigation'
import { ideaStore } from '@/shared/store/ideaStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface IdeaProcessingProps {
  taskId: string
  username?: string // 사용자 이름 (옵션)
}

const IdeaProcessing: React.FC<IdeaProcessingProps> = ({
  taskId,
  username,
}) => {
  const [queryClient] = useState(() => new QueryClient())
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('관련 시장 규모를 분석중이에요')

  const { mutate, data } = useIdeaStatus(taskId) // 자동 폴링 활성화
  const router = useRouter()
  useEffect(() => {
    mutate({
      onProgress: (status) => {
        if (status.progress !== undefined) {
          setProgress(Math.round(status.progress * 100))
        }
        if (status.message) {
          setMessage(status.message)
        }
      },
    })
  }, [mutate])
  // 상태 조회 쿼리 - remove the type parameter

  // Zustand 스토어에서 액션 가져오기
  const setAnalysisResult = ideaStore((state) => state.setAnalysisResult)
  const setAnalysisComplete = ideaStore((state) => state.setAnalysisComplete)

  // 결과가 완료되면 스토어에 저장하고 페이지 이동
  useEffect(() => {
    if (data?.is_complete && data.result) {
      setAnalysisResult(data.result.project)
      setAnalysisComplete(true)
      router.push('/idea/analysis')
    }
  }, [
    data?.is_complete,
    data?.result,
    setAnalysisResult,
    setAnalysisComplete,
    router,
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={processingStyles.container}>
        <Box sx={processingStyles.progressContainer}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={400}
            thickness={4}
            sx={processingStyles.backgroundProgress}
          />
          <CircularProgress
            variant="determinate"
            value={progress}
            size={400}
            thickness={4}
            sx={processingStyles.foregroundProgress}
          />
          <Box sx={processingStyles.progressTextContainer}>
            <Typography
              variant="h3"
              component="div"
              sx={processingStyles.progressText}
            >
              {`${progress}%`}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h5" sx={processingStyles.titleText}>
          {username}의 아이디어를 분석중이에요...
        </Typography>

        <Typography variant="body1" sx={processingStyles.messageText}>
          {message}
        </Typography>
      </Box>
    </QueryClientProvider>
  )
}

export default IdeaProcessing
