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

// Define the shape of data returned from the API
interface IdeaStatusData {
  progress?: number
  is_complete?: boolean
  message?: string
  result?: {
    project: {
      id: number
      name: string
    }
  }
}

const IdeaProcessing: React.FC<IdeaProcessingProps> = ({
  taskId,
  username = 'XX님',
}) => {
  const [queryClient] = useState(() => new QueryClient())

  // 상태 조회 쿼리 - remove the type parameter
  const { data, isLoading, isError } = useIdeaStatus(taskId, true) // 자동 폴링 활성화

  const router = useRouter()

  // Zustand 스토어에서 액션 가져오기
  const setAnalysisResult = ideaStore((state) => state.setAnalysisResult)
  const setAnalysisComplete = ideaStore((state) => state.setAnalysisComplete)

  // Type-safe access to data with type assertion
  const statusData = data as IdeaStatusData | undefined

  // 결과가 완료되면 스토어에 저장하고 페이지 이동
  useEffect(() => {
    if (statusData?.is_complete && statusData?.result) {
      // 분석 결과를 스토어에 저장
      setAnalysisResult(statusData.result)

      // 분석 완료 상태 설정
      setAnalysisComplete(true)

      // 결과 페이지로 이동
      router.push('/idea/analysis')
    }
  }, [
    statusData?.is_complete,
    statusData?.result,
    setAnalysisResult,
    setAnalysisComplete,
    router,
  ])

  // 진행률 계산 (데이터가 없거나 로딩 중일 때는 애니메이션)
  const [animatedProgress, setAnimatedProgress] = React.useState(0)

  useEffect(() => {
    const intervalId: NodeJS.Timeout | null = null

    // 실제 진행률이 있으면 그 값을 사용
    if (statusData?.progress !== undefined) {
      setAnimatedProgress(Math.round(statusData.progress * 100))

      // 이미 설정된 인터벌이 있으면 정리
      if (intervalId) {
        clearInterval(intervalId)
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [statusData, isLoading])

  // 상태에 따른 메시지
  const statusMessage = React.useMemo(() => {
    if (isError) {
      return `일시적인 오류가 발생했습니다. 분석은 계속 진행 중입니다.`
    }

    if (isLoading && !statusData) {
      return '분석 상태를 확인하는 중...'
    }

    if (statusData?.message) {
      return statusData.message
    }

    return '관련 시장 규모를 분석중이에요'
  }, [statusData, isLoading, isError])

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
            value={animatedProgress}
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
              {`${animatedProgress}%`}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h5" sx={processingStyles.titleText}>
          {username}의 아이디어를 분석중이에요...
        </Typography>

        <Typography variant="body1" sx={processingStyles.messageText}>
          {statusMessage}
        </Typography>
      </Box>
    </QueryClientProvider>
  )
}

export default IdeaProcessing
