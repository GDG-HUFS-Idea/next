'use client'

import React from 'react'
import { Box, Card, Typography } from '@mui/material'
import { styles } from '@/shared/ui/analysis/similarStyles'

const services = [
  { title: '서비스 A', description: '이 서비스는 A 기능을 제공합니다.' },
  { title: '서비스 B', description: '이 서비스는 B 기능을 제공합니다.' },
  { title: '서비스 C', description: '이 서비스는 C 기능을 제공합니다.' },
  { title: '서비스 D', description: '이 서비스는 D 기능을 제공합니다.' },
  { title: '서비스 E', description: '이 서비스는 E 기능을 제공합니다.' },
]

const SimilarServices: React.FC = () => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h6" sx={styles.title}>
        🏢 유사 서비스 분석
      </Typography>
      <Box sx={styles.scrollContainer}>
        {services.map((service, index) => (
          <Card key={index} sx={styles.serviceCard}>
            <Typography variant="h6">{service.title}</Typography>
            <Typography variant="body2">{service.description}</Typography>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default SimilarServices
