import { SxProps, Theme } from '@mui/material'

export const containerSx: SxProps<Theme> = {
  maxWidth: '600px',
  mx: 'auto',
  p: { xs: 2, md: 4 },
  height: 'calc(100vh - 200px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

export const cardSx: SxProps<Theme> = {
  p: 4,
  borderRadius: 2,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}

export const iconContainerSx: SxProps<Theme> = {
  mb: 3,
  width: 80,
  height: 80,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
}

export const iconSx: SxProps<Theme> = {
  fontSize: 48,
  color: 'text.primary',
}

export const titleSx: SxProps<Theme> = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  mb: 2,
}

export const descriptionSx: SxProps<Theme> = {
  color: 'text.secondary',
  mb: 4,
}

export const thankYouTextSx: SxProps<Theme> = {
  color: 'text.secondary',
  mb: 2,
}

export const buttonSx: SxProps<Theme> = {
  mt: 4,
}
