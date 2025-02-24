'use client'

import { useState } from 'react'
import Sidebar from './sidebar'

const ClientSidebar = ({ user, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <Sidebar user={user} open={open} setOpen={setOpen}>
      {children}
    </Sidebar>
  )
}

export default ClientSidebar
