import React, { useState } from 'react'
import { Box, Typography, Card, Button } from '@mui/material'
import { styles } from '../../shared/ui/analysis/expectedStyles'
import { Expand } from 'lucide-react'
import PopupModal from './popupModal'

const ExpectedBM: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  // 모달 열기 & 닫기 함수
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  return (
    <Box sx={styles.sectionCard}>
      <Box display="flex">
        <Typography variant="h6">📝 예상 BM</Typography>
        <Button sx={styles.bmButton} onClick={handleOpen}>
          <Expand color="black" />
        </Button>
      </Box>
      <PopupModal isOpen={isOpen} onClose={handleClose} selectedData="" />

      <Box sx={styles.bmContainer}>
        <Card sx={styles.bmCard}>큰 BM 제목</Card>
      </Box>
    </Box>
  )
}

export default ExpectedBM
