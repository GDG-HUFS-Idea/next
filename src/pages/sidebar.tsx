'use client'

import { useState, useEffect } from 'react'
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

const HEADER_HEIGHT = 72 // Header 높이(px) - 실제 헤더 높이에 맞게 조정 필요

const Sidebar = ({
  user,
  children,
}: {
  user: any
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [sidebarTop, setSidebarTop] = useState(HEADER_HEIGHT)

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)

    // 스크롤 위치에 따라 사이드바 상단 위치 조정
    // 스크롤이 헤더 높이보다 크면 사이드바를 상단에 고정, 아니면 헤더 아래로 배치
    if (position < HEADER_HEIGHT) {
      setSidebarTop(HEADER_HEIGHT - position)
    } else {
      setSidebarTop(0)
    }
  }

  // 스크롤 이벤트 리스너 등록 및 해제
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
            width: open ? 220 : 60,
            whiteSpace: 'nowrap',
            transition: 'width 0.3s ease-in-out, top 0.2s ease-out',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #ddd',
            height: `calc(100% - ${sidebarTop}px)`,
            top: sidebarTop,
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

        {/* 메뉴 리스트 - 높이를 90%로 조정 */}
        <Box
          sx={{
            display: 'flex',
            height: '90%',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <List sx={{ width: '3em', alignItems: 'center' }}>
              {/* History 버튼 */}
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleMenuClick('history')}
                  sx={{
                    borderRight:
                      selectedMenu === 'history' ? '2px solid black' : 'none',
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
                    borderRight:
                      selectedMenu === 'settings' ? '2px solid black' : 'none',
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
                    borderRight:
                      selectedMenu === 'help' ? '2px solid black' : 'none',
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
        </Box>

        <Divider sx={{ width: '100%' }} />

        {/* 로그아웃 버튼 - 하단에 고정 */}
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
              {open && <ListItemText primary="Logout" />}
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
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Sidebar
