'use client'

import Sidebar from './sidebar'
import { useAuthStore } from '@/shared/store/authStore'

const ClientSidebar = ({ children }) => {
  const defaultUser = {
    id: 0,
    name: 'Guest',
    permissions: ['로그인이 필요합니다'],
  }
  // Get user from auth store
  const user = useAuthStore((state) => state?.user || defaultUser)

  // Create a default user object to use when user is null

  // Pass user if it exists, otherwise pass the default user
  return <Sidebar user={user}>{children}</Sidebar>
}

export default ClientSidebar
