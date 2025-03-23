import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'
import {
  cardSx,
  cardHeaderSx,
  cardTitleSx,
  infoBoxSx,
  buttonGroupSx,
  cancelButtonSx,
  saveButtonSx,
} from '@/shared/ui/setting/setting'

const ProfileSettings = () => {
  return (
    <Box>
      {/* 현재 구독 플랜 */}
      <Card sx={cardSx}>
        <Box sx={cardHeaderSx}>
          <Typography sx={cardTitleSx}>현재 구독 플랜:</Typography>
        </Box>
        <Box sx={infoBoxSx}>
          <Typography variant="body1">일반 계정</Typography>
        </Box>
      </Card>

      {/* 남은 기간 */}
      <Card sx={cardSx}>
        <Box sx={cardHeaderSx}>
          <Typography sx={cardTitleSx}>남은 기간:</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1">구독 기간</Typography>
          <Typography variant="body1">무제한</Typography>
        </Box>
      </Card>

      {/* 자동 결제 */}
      <Card sx={cardSx}>
        <Box sx={cardHeaderSx}>
          <Typography sx={cardTitleSx}>자동 결제:</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            자동 결제 상태
          </Typography>
          <Typography variant="body1">일반 간</Typography>
        </Box>
      </Card>

      {/* 개인 맞춤 설정 */}
      <Card sx={cardSx}>
        <Box sx={cardHeaderSx}>
          <Typography sx={cardTitleSx}>개인 맞춤 설정 동의 여부</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            다크모드
          </Typography>
          <Typography variant="body1">Language Pack</Typography>
        </Box>
      </Card>
      {/* 버튼 그룹 */}
      <Box sx={buttonGroupSx}>
        <Link href="/setting/cancel" passHref>
          <Button variant="text" sx={cancelButtonSx}>
            회원 탈퇴
          </Button>
        </Link>
        <Button variant="contained" sx={saveButtonSx}>
          플랜 변경
        </Button>
      </Box>
    </Box>
  )
}

export default ProfileSettings
