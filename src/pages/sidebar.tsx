'use client'

import { useState } from 'react'
import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Divider,
  Typography,
  ListItemButton,
  Box,
} from '@mui/material'
import Historys from './sidebar/historys'
import { Settings, LogOut, HelpCircle, ShieldCheck } from 'lucide-react'

const Sidebar = ({
  user,
  open,
  setOpen,
  children,
}: {
  user: any
  open: boolean
  setOpen: (open: boolean) => void
  children: React.ReactNode
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen)
  }

  const toggleAdmin = () => {
    setAdminOpen(!adminOpen)
  }

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? 270 : 80,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',

            position: 'fixed',
            height: '100vh',
            width: open ? 270 : 80,
            transition: 'width 0.3s',
            overflowX: 'hidden',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* 프로필 영역 */}
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
          <Avatar sx={{ width: 40, height: 40 }} src={user.avatar} />
          {open && (
            <Box sx={{ marginLeft: 2 }}>
              <Typography variant="caption" color="gray">
                {user.role === 'admin' ? 'ADMINISTRATOR' : 'PRODUCT MANAGER'}
              </Typography>
              <Typography variant="body1">{user.name}</Typography>
            </Box>
          )}
          <IconButton onClick={toggleDrawer} sx={{ marginLeft: 'auto' }}>
            {open ? '<' : '>'}
          </IconButton>
        </Box>
        <Divider />

        {/* 메뉴 리스트 */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <List>
            <Historys open={open} />
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={toggleSettings}>
                <ListItemIcon>
                  <Settings size={20} />
                </ListItemIcon>
                {open && <ListItemText primary="Settings" />}
              </ListItemButton>
            </ListItem>
            <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Sub Setting 1" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Sub Setting 2" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
          {user.role === 'admin' && (
            <>
              <Divider />
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={toggleAdmin}>
                    <ListItemIcon>
                      <ShieldCheck size={20} />
                    </ListItemIcon>
                    {open && <ListItemText primary="Management" />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={adminOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="User Management" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </>
          )}
        </Box>

        {/* 하단 고정 - 도움말 & 로그아웃 */}
        <Box sx={{ paddingBottom: 0 }}>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HelpCircle size={28} />
                </ListItemIcon>
                {open && <ListItemText primary="Help" />}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LogOut size={28} />
                </ListItemIcon>
                {open && <ListItemText primary="Logout Account" />}
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          transition: 'margin 0.3s ease-in-out',
          width: `calc(100% - ${open ? 270 : 80}px)`,
          minHeight: '100vh',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Sidebar
