'use client'

import { useState, useEffect } from 'react'
import { CircularProgress, Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function IdeaProcessing() {
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer)

          return 100
        }
        return Math.min(oldProgress + Math.random() * 10, 100)
      })
    }, 500)
    if (progress >= 100) {
      router.push('/idea/analysis')
    }

    return () => clearInterval(timer)
  }, [progress, router])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={500}
          thickness={6}
          sx={{ color: '#6c7ee1' }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h2" component="div" color="textPrimary">
            {`${Math.round(progress)}%`}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
        XX님의 아이디어를 분석중이에요...
      </Typography>
      <Typography variant="body1" color="textSecondary">
        관련 시장 규모를 분석중이에요
      </Typography>
    </Box>
  )
}
