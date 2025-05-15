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
  Collapse,
  Tooltip,
} from '@mui/material'
import { Settings, LogOut, HelpCircle, History, User } from 'lucide-react'
// 프로젝트 API 커스텀 훅 사용
import { useMyProjects } from '@/shared/api/idea/myIdea'
import { AnalysisResult, ideaStore } from '@/shared/store/ideaStore'
import { useRouter } from 'next/navigation'
import { useDeleteCookie } from '@/shared/api/cookie'

const HEADER_HEIGHT = 72 // Header 높이(px) - 실제 헤더 높이에 맞게 조정 필요

const Sidebar = ({
  user,
  children,
}: {
  user: {
    id: number
    name: string
    permissions: string[]
  }
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)
  const [sidebarTop, setSidebarTop] = useState(HEADER_HEIGHT)

  const setProject = ideaStore((state) => state.setAnalysisResult)

  const router = useRouter()

  const deleteMutation = useDeleteCookie()
  useEffect(() => {
    if (deleteMutation.isSuccess) {
      window.location.reload()
    }
  }, [deleteMutation.isSuccess])

  // useMyProjects hook 사용 - 필수 쿼리 파라미터 offset, limit 설정
  const queryParams = {
    offset: 0,
    limit: 10,
  }

  const { data, refetch, isLoading } = useMyProjects(queryParams)

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const position = window.pageYOffset

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
      if (menu === 'history') {
        // history 메뉴 클릭 시 프로젝트 목록 가져오기
        refetch()
      }
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
          <User></User>
          {open && (
            <Box sx={{ marginLeft: 2, marginTop: -1 }}>
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 150,
                  minWidth: 150,
                }}
              >
                {user.name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {user.permissions[0]}
              </Typography>
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
                  {isLoading ? (
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemText primary="로딩 중..." />
                    </ListItemButton>
                  ) : (
                    data?.projects?.map((project: AnalysisResult) => (
                      <Tooltip
                        key={project.id}
                        title={project.name}
                        placement="right"
                        arrow
                      >
                        <ListItemButton
                          sx={{ pl: 2 }}
                          onClick={() => {
                            setProject({ id: project.id, name: project.name })
                            router.push('/idea/analysis')
                          }}
                        >
                          <ListItemText
                            primary={
                              project.name.length > 8
                                ? `${project.name.substring(0, 8)}...`
                                : project.name
                            }
                          />
                        </ListItemButton>
                      </Tooltip>
                    ))
                  )}
                  {(!data?.projects || data.projects.length === 0) &&
                    !isLoading && (
                      <ListItemButton sx={{ pl: 2 }}>
                        <ListItemText primary="프로젝트가 없습니다" />
                      </ListItemButton>
                    )}
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
            <ListItemButton
              sx={{ display: 'flex', alignItems: 'center' }}
              onClick={() => {
                deleteMutation.mutate()
              }}
            >
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
