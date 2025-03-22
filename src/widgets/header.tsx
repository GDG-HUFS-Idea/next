'use client'
import React from 'react'
import { AppBar, Toolbar, IconButton, Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { User, Settings } from 'lucide-react'
import styles from '../shared/ui/headerFooterStyles'

interface HeaderProps {
  open?: boolean
  toggleSidebar?: () => void
}

const Header: React.FC<HeaderProps> = ({ open = false }) => {
  return (
    <AppBar
      sx={{
        ...styles.header,
        ml: open ? '12%' : '3%', // sidebar가 열리면 270px 만큼 좌측 여백을 줍니다.
        width: open ? '88%' : '97%', // sidebar 너비만큼 너비를 줄입니다.
        transition: 'margin 0.5s ease, width 0.5s ease', // 부드러운 애니메이션 효과 추가
      }}
    >
      <Toolbar sx={styles.toolbar}>
        {/* 로고 또는 타이틀 */}
        <Typography
          variant="h6"
          component="div"
          sx={{ mr: '80%', display: 'flex' }}
        >
          💡 SparkLens
        </Typography>
        {/* 우측 아이콘들 */}
        <Box>
          <IconButton color="inherit">
            <User />
          </IconButton>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
