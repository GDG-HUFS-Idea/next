import { Card } from '@mui/material'
import * as React from 'react'
import { styles } from '../../shared/ui/setting/settingLayout'

export default function IdeaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <Card sx={styles.ideaWrapper}>{children}</Card>
    </main>
  )
}
