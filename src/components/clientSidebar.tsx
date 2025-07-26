'use client'

import Sidebar from './sidebar'
import { useGetCookie } from '@/shared/api/cookie'

const ClientSidebar = ({ children }) => {
  const defaultUser = {
    user_id: 0,
    name: 'Guest',
    roles: ['로그인이 필요합니다'],
  }
  // Get user from auth store
  const { data } = useGetCookie()
  console.log(data)
  const user = data?.user ?? defaultUser
  // Create a default user object to use when user is null

  // Pass user if it exists, otherwise pass the default user
  return (
    <Sidebar user={user} jwt={data?.jwt}>
      {children}
    </Sidebar>
  )
}

export default ClientSidebar
