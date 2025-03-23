import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Link from 'next/link'
import {
  cardSx,
  iconContainerSx,
  iconSx,
  titleSx,
  descriptionSx,
  thankYouTextSx,
  buttonSx,
} from '@/shared/ui/setting/success'

const SuccessMessage = () => {
  return (
    <Card sx={cardSx}>
      <Box sx={iconContainerSx}>
        <CheckCircleOutlineIcon sx={iconSx} />
      </Box>

      <Typography variant="h5" sx={titleSx}>
        회원 탈퇴 완료
      </Typography>

      <Typography variant="body1" sx={descriptionSx}>
        SparkLens 회원 탈퇴 과정이 완료되었습니다.
      </Typography>

      <Typography variant="body2" sx={thankYouTextSx}>
        그동안 SparkLens를 이용해주셔서 감사합니다.
      </Typography>

      <Link href="/" passHref>
        <Button variant="contained" sx={buttonSx}>
          홈으로 가기
        </Button>
      </Link>
    </Card>
  )
}

export default SuccessMessage
