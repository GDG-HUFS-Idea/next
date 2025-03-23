import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'
import {
  cardSx,
  titleSx,
  descriptionSx,
  warningTextSx,
  buttonContainerSx,
  cancelButtonSx,
  backButtonSx,
} from '@/shared/ui/setting/cancel'

const CancelForm = () => {
  return (
    <Card sx={cardSx}>
      <Typography variant="h5" sx={titleSx}>
        탈퇴 안내
      </Typography>
      <Typography variant="body1" sx={descriptionSx}>
        회원 탈퇴를 진행하기 전에 아래 항목을 꼭 확인해주세요.
      </Typography>

      <Typography variant="body2" sx={warningTextSx}>
        • 탈퇴 시 모든 개인 데이터가 삭제되며 이 작업은 되돌릴 수 없습니다.
      </Typography>
      <Typography variant="body2" sx={warningTextSx}>
        • 현재 구독 중인 서비스가 있다면 즉시 해지됩니다.
      </Typography>
      <Typography variant="body2" sx={warningTextSx}>
        • 결제 내역과 영수증은 법적 요구사항에 따라 일정 기간 보관됩니다.
      </Typography>

      <Box sx={buttonContainerSx}>
        <Link href="/setting" passHref>
          <Button variant="contained" sx={backButtonSx}>
            뒤로 가기
          </Button>
        </Link>
        <Link href="/setting/cancel/success" passHref>
          <Button variant="contained" sx={cancelButtonSx}>
            회원 탈퇴
          </Button>
        </Link>
      </Box>
    </Card>
  )
}

export default CancelForm
