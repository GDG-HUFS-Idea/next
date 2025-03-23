'use client'

import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import ProfileSettings from './profileSettings'
import {
  tabContainerSx,
  tabContentSx,
  tabsSx,
} from '@/shared/ui/setting/setting'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`setting-tabpanel-${index}`}
      aria-labelledby={`setting-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={tabContentSx}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `setting-tab-${index}`,
    'aria-controls': `setting-tabpanel-${index}`,
  }
}

const SettingTabs = () => {
  const [value, setValue] = useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={tabContainerSx}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="setting tabs"
          variant="fullWidth"
          sx={tabsSx}
        >
          <Tab label="계 정" {...a11yProps(0)} />
          <Tab label="결제 내역" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ProfileSettings />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{ p: 2 }}>
          <p>결제 내역 탭 콘텐츠가 여기에 표시됩니다.</p>
        </Box>
      </TabPanel>
    </Box>
  )
}

export default SettingTabs
