import { Grid2 } from '@mui/material'
import Challenges from './bottom/challenges'
import Team from './bottom/team'

export default function TeamAndChallenges() {
  return (
    <Grid2 container spacing={14}>
      <Team />
      <Challenges />
    </Grid2>
  )
}
