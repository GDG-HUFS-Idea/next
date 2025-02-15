'use client'

import React, { useState } from 'react'
import { Box, Typography, Card, Button, TextField } from '@mui/material'
import { styles } from '@/shared/ui/input/inputStyles'

const IdeaInput: React.FC = () => {
  const [problemText, setProblemText] = useState('') // 문제 입력 상태
  const [solutionText, setSolutionText] = useState('') // 솔루션 입력 상태

  // 입력 필드 변경 핸들러
  const handleProblemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProblemText(event.target.value)
  }

  const handleSolutionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSolutionText(event.target.value)
  }

  // 버튼 활성화 조건: 두 입력 필드 중 하나라도 값이 있으면 활성화
  const isButtonDisabled = !problemText.trim() || !solutionText.trim()
  return (
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
            onChange={handleProblemChange} // 값 변경 감지
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
            onChange={handleSolutionChange} // 값 변경 감지
          />
        </Box>
      </Card>

      <Box mt={3} sx={styles.buttonBox}>
        <Button
          variant="contained"
          sx={styles.startButton}
          disabled={isButtonDisabled}
          type="submit"
        >
          분석 시작
        </Button>
      </Box>
      <Box sx={styles.analysisContainer}>
        <Card sx={styles.analysisCard}>
          <Typography variant="h6" fontWeight="bold">
            📊 SWOT Analysis
          </Typography>
          <Typography variant="body2">
            Comprehensive analysis of Strengths, Weaknesses, Opportunities, and
            Threats
          </Typography>
        </Card>

        <Card sx={styles.analysisCard}>
          <Typography variant="h6" fontWeight="bold">
            📈 Market Size
          </Typography>
          <Typography variant="body2">
            Detailed market analysis and potential
          </Typography>
        </Card>

        <Card sx={styles.analysisCard}>
          <Typography variant="h6" fontWeight="bold">
            🏢 Competitor Analysis
          </Typography>
          <Typography variant="body2">
            Overview of similar services and competitive landscape
          </Typography>
        </Card>
      </Box>
    </Box>
  )
}

export default IdeaInput
