import React from 'react'
import Box from '@mui/material/Box'
import SettingTabs from '@/pages/setting/settingTabs'
import { containerSx } from '@/shared/ui/setting/setting'

export default function SettingPage() {
  return (
    <Box sx={containerSx}>
      <SettingTabs />
    </Box>
  )
}
