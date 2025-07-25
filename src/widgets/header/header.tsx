'use client'
import React from 'react'
import { AppBar, Toolbar, IconButton, Box, Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { User, Settings } from 'lucide-react'
import styles from '@/shared/ui/headerFooterStyles'
import { useRouter } from 'next/navigation'

const Header: React.FC = () => {
  const router = useRouter()
  return (
    <AppBar sx={styles.header}>
      <Toolbar sx={styles.toolbar}>
        {/* Logo or Title */}
        <Button
          color="inherit"
          variant="text"
          disableRipple
          onClick={() => router.push('/idea/input')}
        >
          <Typography variant="h6" component="div">
            💡 SparkLens
          </Typography>
        </Button>
        {/* Icons */}
        <Box>
          <IconButton color="inherit" onClick={() => router.push('/login')}>
            <User />
          </IconButton>
          <IconButton color="inherit" onClick={() => router.push('/setting')}>
            <Settings />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
