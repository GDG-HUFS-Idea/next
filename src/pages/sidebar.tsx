'use client'

import {
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
import { usePathname } from 'next/navigation'
import {
  History,
  Settings,
  LogOut,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react'

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
  const pathname = usePathname()

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const menuItems = [
    { text: 'History', icon: <History size={20} />, path: '/history' },
    { text: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ]

  if (user.role === 'admin') {
    menuItems.push({
      text: 'Admin',
      icon: <ShieldCheck size={20} />,
      path: '/admin',
    })
  }

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: 'absolute',
          transition: 'translateX 1.2s',
          marginTop: '0.6%',
          transform: open ? 'translateX(520%)' : 'translateX(140%)',
          zIndex: 1500,
          backgroundColor: 'white',
          boxShadow: 2,
          width: '2.5%',
        }}
      >
        {open ? '<' : '>'}
      </IconButton>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? 240 : 80,
          flexShrink: 0,
          transform: 'translateY(0%)',
          '& .MuiDrawer-paper': {
            borderRight: '1px solid #e0e0e0',
            width: open ? 240 : 80,
            transition: 'width 0.3s',
            overflowX: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1400,
          }}
        ></Box>
        <List>
          <ListItem sx={{ minHeight: 56 }}>
            <Avatar sx={{ width: 40, height: 40 }} src={user.avatar} />
            <Typography
              variant="body1"
              sx={{
                marginLeft: 2,
                opacity: open ? 1 : 0,
                transition: 'opacity 0.3s',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: open ? 'auto' : '0px',
              }}
            >
              {user.name}
            </Typography>
          </ListItem>
          <Divider />
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={{ minHeight: 48, display: 'flex', alignItems: 'center' }}
            >
              <ListItemButton
                component="a"
                href={item.path}
                selected={pathname === item.path}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'left',
                  padding: '10px 20px',
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    transition: 'opacity 0.3s',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItem disablePadding sx={{ minHeight: 48 }}>
            <ListItemButton>
              <ListItemIcon>
                <HelpCircle size={20} />
              </ListItemIcon>
              <ListItemText
                primary="Help"
                sx={{ opacity: open ? 1 : 0, transition: 'opacity 0.3s' }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ minHeight: 48 }}>
            <ListItemButton>
              <ListItemIcon>
                <LogOut size={20} />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{ opacity: open ? 1 : 0, transition: 'opacity 0.3s' }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        sx={{
          flexGrow: 1,
          transition: 'width 0.3s ease-in-out',
          width: open ? 'calc(100% - 240px)' : 'calc(100% - 80px)',
          padding: '20px',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Sidebar
