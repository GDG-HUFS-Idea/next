'use client'

import * as React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Box, Tabs, Tab } from '@mui/material'
import Link from 'next/link'
import { styles } from '@/shared/ui/navigationStyles'

export default function NavigationTab() {
  const router = useRouter()
  const pathname = usePathname() ?? '' // `null` 방지

  // 네비게이션 탭 목록
  const tabs = [
    { label: '아이디어 입력', path: '/idea/input' },
    { label: '기초 분석', path: '/idea/analysis' },
    { label: '9 Blocks', path: '/idea/9-blocks' },
  ]

  // 현재 경로와 일치하는 탭 찾기
  const currentTab =
    tabs.find((tab) => pathname.startsWith(tab.path))?.path || false

  // 페이지 이동 핸들러 (즉시 UI 변경)
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    router.push(newValue)
  }

  // 페이지 미리 불러오기 (탭에 마우스를 올릴 때)
  const handlePrefetch = (path: string) => {
    router.prefetch(path)
  }

  return (
    <Box sx={styles.navBar}>
      {/* 네비게이션 탭 */}
      <Tabs
        value={currentTab}
        onChange={handleChange}
        aria-label="Navigation Tabs"
        sx={styles.tabsWrapper}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.path}
            label={tab.label}
            value={tab.path}
            component={Link}
            href={tab.path}
            disabled={tab.path !== currentTab}
            onMouseEnter={() => handlePrefetch(tab.path)} // 페이지 미리 불러오기
          />
        ))}
      </Tabs>
    </Box>
  )
}
