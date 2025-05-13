'use client'

import Sidebar from './sidebar'
import { useAuthStore } from '@/shared/store/authStore'

const ClientSidebar = ({ children }) => {
  const user = useAuthStore((state) => state?.user)
  console.log(user)
  return <Sidebar user={user}>{children}</Sidebar>
}

export default ClientSidebar
