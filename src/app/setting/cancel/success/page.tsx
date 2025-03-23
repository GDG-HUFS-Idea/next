import React from 'react'
import Box from '@mui/material/Box'
import SuccessMessage from '@/pages/setting/successMessage'
import { containerSx } from '@/shared/ui/setting/success'

export default function SuccessPage() {
  return (
    <Box sx={containerSx}>
      <SuccessMessage />
    </Box>
  )
}
