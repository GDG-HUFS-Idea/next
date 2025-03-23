import React from 'react'
import Box from '@mui/material/Box'
import CancelForm from '@/pages/setting/cancelForm'
import { containerSx } from '@/shared/ui/setting/cancel'

export default function CancelPage() {
  return (
    <Box sx={containerSx}>
      <CancelForm />
    </Box>
  )
}
