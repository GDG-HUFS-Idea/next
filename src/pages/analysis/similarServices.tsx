'use client'

import React, { useState } from 'react'
import { Box, Button, Card, Typography } from '@mui/material'
import { styles } from '../../shared/ui/analysis/similarStyles'
import { Expand } from 'lucide-react'
import PopupModal from './popupModal'

const services = [
  { title: '서비스 A', description: '이 서비스는 A 기능을 제공합니다.' },
  { title: '서비스 B', description: '이 서비스는 B 기능을 제공합니다.' },
  { title: '서비스 C', description: '이 서비스는 C 기능을 제공합니다.' },
  { title: '서비스 D', description: '이 서비스는 D 기능을 제공합니다.' },
  { title: '서비스 E', description: '이 서비스는 E 기능을 제공합니다.' },
]

const SimilarServices: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<string | null>(null)

  // 모달 열기 & 닫기 함수
  const handleOpen = (i: string) => {
    setIsOpen(true)
    setData(i)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <Box sx={styles.container}>
      <Typography variant="h6" sx={styles.title}>
        🏢 유사 서비스 분석
      </Typography>
      <Box sx={styles.scrollContainer}>
        {services.map((service, index) => (
          <Card key={index} sx={styles.serviceCard}>
            <Box display="flex">
              <Typography variant="h6" sx={{ color: '#4D7345' }}>
                {service.title}
              </Typography>
              <Button
                sx={{ marginLeft: 'auto' }}
                onClick={() => handleOpen(service.title)}
                key={index}
              >
                <Expand color="black" />
              </Button>
            </Box>
            <Typography variant="body2">{service.description}</Typography>
          </Card>
        ))}
        <PopupModal isOpen={isOpen} onClose={handleClose} selectedData={data} />
      </Box>
    </Box>
  )
}

export default SimilarServices
