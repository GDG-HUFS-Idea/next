import { Card } from '@mui/material'
import * as React from 'react'
import { styles } from '../../shared/ui/setting/settingLayout'
import ClientSidebar from '@/pages/clientSidebar'

export default function IdeaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = {
    name: 'Andrew Smith',
    avatar: '/avatar.png',
  }
  return (
    <main>
      <ClientSidebar user={user}>
        <Card sx={styles.ideaWrapper}>{children}</Card>
      </ClientSidebar>
    </main>
  )
}
