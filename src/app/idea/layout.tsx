import { Card } from '@mui/material'
import * as React from 'react'
import { styles } from '../../shared/ui/ideaStyles'
import NavigationTab from '@/pages/navigationTab'
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
        <NavigationTab />
        <Card sx={styles.ideaWrapper}>{children}</Card>
      </ClientSidebar>
    </main>
  )
}
