import NavigationTab from '@/pages/navigationTab'
import { Card } from '@mui/material'
import * as React from 'react'
import { styles } from '@/shared/ui/ideaStyles'

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
