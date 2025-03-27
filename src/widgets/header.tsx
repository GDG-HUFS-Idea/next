'use client'
import React from 'react'
import { AppBar, Toolbar, IconButton, Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { User, Settings } from 'lucide-react'
import styles from '../shared/ui/headerFooterStyles'

const Header: React.FC = () => {
  return (
    <AppBar
      sx={{
        ...styles.header,
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
