'use client'

import { useState, useEffect, useCallback } from 'react'
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
  Link,
  Button,
} from '@mui/material'
import {
  Settings,
  LogOut,
  HelpCircle,
  History,
  User,
  PanelLeft,
} from 'lucide-react'
import { useMyProjects } from '@/shared/api/idea/myIdea'
import { AnalysisResult, ideaStore } from '@/shared/store/ideaStore'
import { useRouter } from 'next/navigation'
import { useDeleteCookie, useGetCookie } from '@/shared/api/cookie'

const HEADER_HEIGHT = 72

const Sidebar = ({
  children,
  user,
  jwt,
}: {
  children: React.ReactNode
  user: { user_id: number; name: string; roles: string[] }
  jwt: string
}) => {
  const [open, setOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)
  const [sidebarTop, setSidebarTop] = useState(HEADER_HEIGHT)

  const setProject = ideaStore((state) => state.setAnalysisResult)
  const router = useRouter()
  const deleteMutation = useDeleteCookie()

  const queryParams = { offset: 0, limit: 100 }
  const { data, refetch, isLoading } = useMyProjects(queryParams)

  const handleScroll = useCallback(() => {
    const position = typeof window !== 'undefined' ? window.pageYOffset : 0
    setSidebarTop(position < HEADER_HEIGHT ? HEADER_HEIGHT - position : 0)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      router.push('/login')
    }
  }, [deleteMutation.isSuccess, router])

  const toggleSidebar = () => setOpen((prev) => !prev)

  const handleMenuClick = (menu: string) => {
    const isSameMenu = selectedMenu === menu
    setSelectedMenu(isSameMenu ? null : menu)
    setOpen(!isSameMenu)
    if (menu === 'history' && !isSameMenu) refetch()
  }

  const listItemButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 2,
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? 270 : 56,
          flexShrink: 0,
          transition: 'width 0.3s ease',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            position: 'fixed',
            width: open ? 270 : 56,
            whiteSpace: 'nowrap',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #ddd',
            height: `calc(100% - ${sidebarTop}px)`,
            top: sidebarTop,
            transition: 'width 0.3s ease',
            overflow: 'hidden',
          },
        }}
      >
        {/* 프로필 영역 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'flex-start' : 'center',
            paddingLeft: open ? 2 : 0,
            paddingTop: 3,
            paddingBottom: 2,
            width: '100%',
            minHeight: '8%',
            flexDirection: open ? 'row' : 'column',
            gap: open ? 0 : 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: open ? 'flex-start' : 'center',
              marginLeft: open ? 2 : 0,
            }}
          >
            <User />
            {open && (
              <>
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: 180,
                  }}
                >
                  {user?.name || '익명 사용자'}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {user?.roles?.[0] === '로그인이 필요합니다' ? (
                    <Link href="/login" sx={{ color: 'black' }}>
                      로그인
                    </Link>
                  ) : (
                    user?.roles?.[0]
                  )}
                </Typography>
              </>
            )}
          </Box>
          <Button
            onClick={toggleSidebar}
            sx={{
              minWidth: open ? 'auto' : '40px',
              padding: '8px',
            }}
          >
            <PanelLeft color="black" />
          </Button>
        </Box>

        {/* 메뉴 영역 */}
        <Box sx={{ height: '90%', flexDirection: 'column', overflow: 'auto' }}>
          <List sx={{ width: '100%' }}>
            <Divider sx={{ width: '100%' }} />

            {/* History */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleMenuClick('history')}
                sx={{
                  ...listItemButtonStyle,
                  borderRight:
                    selectedMenu === 'history' ? '2px solid black' : 'none',
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', marginRight: 2 }}>
                  <History size={24} />
                </ListItemIcon>
                <ListItemText
                  primary="History"
                  sx={{ display: open ? 'block' : 'none' }}
                />
              </ListItemButton>
            </ListItem>

            <Collapse
              in={selectedMenu === 'history' && open}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {!jwt ? (
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemText primary="로그인이 필요합니다" />
                  </ListItemButton>
                ) : isLoading ? (
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemText primary="로딩 중..." />
                  </ListItemButton>
                ) : (
                  data?.projects?.map((project: AnalysisResult) => {
                    const shortName =
                      project.name.length > 8
                        ? `${project.name.substring(0, 8)}...`
                        : project.name

                    return (
                      <ListItemButton
                        key={project.id}
                        sx={{ pl: 2 }}
                        onClick={() => {
                          setProject({ id: project.id, name: project.name })
                          router.push('/idea/analysis')
                        }}
                      >
                        {project.name.length > 8 ? (
                          <Tooltip title={project.name} placement="right" arrow>
                            <ListItemText primary={shortName} />
                          </Tooltip>
                        ) : (
                          <ListItemText primary={project.name} />
                        )}
                      </ListItemButton>
                    )
                  })
                )}
                {jwt &&
                  (!data?.projects || data.projects.length === 0) &&
                  !isLoading && (
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemText primary="프로젝트가 없습니다" />
                    </ListItemButton>
                  )}
              </List>
            </Collapse>

            <Divider sx={{ width: '100%' }} />

            {/* Settings */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleMenuClick('settings')}
                sx={{
                  ...listItemButtonStyle,
                  borderRight:
                    selectedMenu === 'settings' ? '2px solid black' : 'none',
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', marginRight: 2 }}>
                  <Settings size={24} />
                </ListItemIcon>
                <ListItemText
                  primary="Settings"
                  sx={{ display: open ? 'block' : 'none' }}
                />
              </ListItemButton>
            </ListItem>
            <Collapse
              in={selectedMenu === 'settings' && open}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemText primary="Profile Settings" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemText primary="Privacy & Security" />
                </ListItemButton>
              </List>
            </Collapse>

            <Divider sx={{ width: '100%' }} />

            {/* Help */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleMenuClick('help')}
                sx={{
                  ...listItemButtonStyle,
                  borderRight:
                    selectedMenu === 'help' ? '2px solid black' : 'none',
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', marginRight: 2 }}>
                  <HelpCircle size={24} />
                </ListItemIcon>
                <ListItemText
                  primary="Help"
                  sx={{ display: open ? 'block' : 'none' }}
                />
              </ListItemButton>
            </ListItem>
            <Collapse
              in={selectedMenu === 'help' && open}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemText primary="FAQs" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemText primary="Contact Support" />
                </ListItemButton>
              </List>
            </Collapse>

            <Divider sx={{ width: '100%' }} />
          </List>
        </Box>

        {/* 로그아웃 */}
        {jwt && (
          <>
            <Divider sx={{ width: '100%' }} />
            <Box sx={{ marginTop: 'auto', width: '100%' }}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => deleteMutation.mutate()}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto', marginRight: 2 }}>
                    <LogOut size={24} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logout"
                    sx={{ display: open ? 'block' : 'none' }}
                  />
                </ListItemButton>
              </ListItem>
            </Box>
          </>
        )}
      </Drawer>

      {/* 메인 컨텐츠 */}
      <Box
        sx={{
          marginLeft: open ? '270px' : '56px',
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Sidebar
