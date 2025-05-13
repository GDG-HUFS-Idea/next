import NavigationTab from '@/components/navigationTab'
import { Card } from '@mui/material'
import * as React from 'react'
import { styles } from '../../shared/ui/ideaStyles'
import ClientSidebar from '@/components/clientSidebar'

export default function IdeaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <ClientSidebar>
        <NavigationTab />

        <Card sx={styles.ideaWrapper}>{children}</Card>
      </ClientSidebar>
    </main>
  )
}
