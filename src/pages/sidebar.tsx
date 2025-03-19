'use client'

import { useState } from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  ListItemButton,
  Box,
  Avatar,
  Collapse,
  Tooltip,
} from '@mui/material'
import { Settings, LogOut, HelpCircle, History } from 'lucide-react'
import Header from '@/widgets/header'

const Sidebar = ({
  user,
  children,
}: {
  user: any
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)

  const handleMenuClick = (menu: string) => {
    setSelectedMenu((prev) => (prev === menu ? null : menu))
    if (selectedMenu === menu) {
      setOpen(false) // 메뉴 클릭 시 사이드바 축소
    } else {
      setOpen(true) // 메뉴 클릭 시 사이드바 확장
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* 사이드바 */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? 270 : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            position: 'fixed',
            height: '100vh',
            width: open ? 220 : 60,
            whiteSpace: 'nowrap',
            transition: 'width 0.3s ease-in-out',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #ddd',
          },
        }}
      >
        {/* 프로필 영역 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 2,
            paddingBottom: 2,
            width: '100%',
          }}
        >
          <Avatar sx={{ width: 40, height: 40 }} src={user.avatar} />
          {open && (
            <Box sx={{ marginLeft: 2, marginTop: -1 }}>
              <Typography variant="caption" color="textSecondary">
                {user.role === 'admin' ? 'ADMINISTRATOR' : 'PRODUCT MANAGER'}
              </Typography>
              <Typography>{user.name}</Typography>
            </Box>
          )}
        </Box>
        <Divider sx={{ width: '100%' }} />

        {/* 메뉴 리스트 */}
        <Box sx={{ display: 'flex' }}>
          <List sx={{ width: '3em', alignItems: 'center' }}>
            {/* History 버튼 */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleMenuClick('history')}
                sx={{
                  borderLeft:
                    selectedMenu === 'history' ? '4px solid black' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto' }}>
                  <Tooltip
                    title="History"
                    placement="right"
                    arrow
                    disableInteractive
                  >
                    <Box>
                      <History size={24} />
                    </Box>
                  </Tooltip>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            {/* 설정 버튼 */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleMenuClick('settings')}
                sx={{
                  borderLeft:
                    selectedMenu === 'settings' ? '4px solid black' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto' }}>
                  <Tooltip
                    title="Settings"
                    placement="right"
                    arrow
                    disableInteractive
                  >
                    <Box>
                      <Settings size={24} />
                    </Box>
                  </Tooltip>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            {/* 도움말 버튼 */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleMenuClick('help')}
                sx={{
                  borderLeft:
                    selectedMenu === 'help' ? '4px solid black' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto' }}>
                  <Tooltip
                    title="Help"
                    placement="right"
                    arrow
                    disableInteractive
                  >
                    <Box>
                      <HelpCircle size={24} />
                    </Box>
                  </Tooltip>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>

          {/* 세부 메뉴 */}
          {selectedMenu === 'history' && (
            <Collapse in={selectedMenu === 'history'} timeout="auto">
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemText primary="Recent Files" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemText primary="Deleted Items" />
                </ListItemButton>
              </List>
            </Collapse>
          )}
          {selectedMenu === 'settings' && (
            <Collapse in={selectedMenu === 'settings'} timeout="auto">
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemText primary="Profile Settings" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemText primary="Privacy & Security" />
                </ListItemButton>
              </List>
            </Collapse>
          )}

          {selectedMenu === 'help' && (
            <Collapse in={selectedMenu === 'help'} timeout="auto">
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemText primary="FAQs" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemText primary="Contact Support" />
                </ListItemButton>
              </List>
            </Collapse>
          )}
        </Box>
        <Divider sx={{ width: '100%' }} />

        {/* 로그아웃 버튼 */}
        <Box sx={{ marginTop: 'auto', width: '100%' }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemIcon sx={{ minWidth: 'auto' }}>
                <Tooltip
                  title="Logout"
                  placement="right"
                  arrow
                  disableInteractive
                >
                  <Box>
                    <LogOut size={24} />
                  </Box>
                </Tooltip>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>

      {/* 메인 컨텐츠 */}
      <Box
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          overflow: 'auto',
          paddingLeft: 0,
        }}
      >
        <Header open={open} />
        {children}
      </Box>
    </Box>
  )
}

export default Sidebar
