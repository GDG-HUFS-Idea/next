import { SxProps, Theme } from '@mui/material'

export const containerSx: SxProps<Theme> = {
  maxWidth: '600px',
  mx: 'auto',
  p: { xs: 2, md: 4 },
  height: 'calc(100vh - 200px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}

export const cardSx: SxProps<Theme> = {
  p: 4,
  borderRadius: 2,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
}

export const titleSx: SxProps<Theme> = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  mb: 2,
  textAlign: 'center',
}

export const descriptionSx: SxProps<Theme> = {
  textAlign: 'center',
  color: 'text.secondary',
  mb: 4,
}

export const warningTextSx: SxProps<Theme> = {
  color: 'text.secondary',
  mb: 2,
}

export const buttonContainerSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  gap: 2,
  mt: 4,
}

export const cancelButtonSx: SxProps<Theme> = {
  backgroundColor: 'secondary.main',
  color: 'white',
  '&:hover': {
    backgroundColor: 'secondary.dark',
  },
}

export const backButtonSx: SxProps<Theme> = {
  color: 'text.secondary',
  backgroundColor: '#f5f5f5',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
}
