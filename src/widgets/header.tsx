'use client'
import React from 'react'
import { AppBar, Toolbar, IconButton, Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { User, Settings } from 'lucide-react'
import styles from '../shared/ui/headerFooterStyles'

const Header: React.FC = () => {
  return (
    <AppBar sx={styles.header}>
      <Toolbar sx={styles.toolbar}>
        {/* Logo or Title */}
        <Typography variant="h6" component="div">
          💡 SparkLens
        </Typography>

        {/* Icons */}
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
