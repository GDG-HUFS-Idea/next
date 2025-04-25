'use client'
import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import styles from '@/shared/ui/headerFooterStyles'


const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={styles.footer}>
      <Typography variant="body2" color="textSecondary">
        © 2025 SparkLens. All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer
