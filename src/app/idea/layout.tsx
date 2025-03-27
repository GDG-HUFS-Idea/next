import { Card } from '@mui/material'
import * as React from 'react'
import { styles } from '../../shared/ui/ideaStyles'
import NavigationTab from '@/pages/navigationTab'

export default function IdeaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <NavigationTab />
      <Card sx={styles.ideaWrapper}>{children}</Card>
    </main>
  )
}
