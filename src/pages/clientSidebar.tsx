'use client'

import Sidebar from './sidebar'

const ClientSidebar = ({ user, children }) => {

  return (
    <Sidebar user={user}>
      {children}
    </Sidebar>
  )
}

export default ClientSidebar
