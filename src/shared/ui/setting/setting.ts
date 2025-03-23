import { SxProps, Theme } from '@mui/material'

export const containerSx: SxProps<Theme> = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: { xs: '20px', md: '40px 20px' },
}

export const tabContainerSx: SxProps<Theme> = {
  marginBottom: '24px',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: '#f0f0f0',
}

export const tabContentSx: SxProps<Theme> = {
  backgroundColor: '#ffffff',
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
}

export const tabsSx: SxProps<Theme> = {
  '& .MuiTabs-indicator': {
    backgroundColor: 'primary.main',
    height: 3,
  },
}

export const cardSx: SxProps<Theme> = {
  p: 3,
  mb: 3,
  borderRadius: 2,
}

export const cardHeaderSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  mb: 2,
}

export const cardTitleSx: SxProps<Theme> = {
  fontWeight: 'bold',
  fontSize: '1.1rem',
}

export const infoBoxSx: SxProps<Theme> = {
  p: 2,
  bgcolor: '#f9f9f9',
  borderRadius: 1,
  mb: 2,
}

export const infoRowSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
  p: 1.5,
  borderBottom: '1px solid #f0f0f0',
}

export const labelSx: SxProps<Theme> = {
  color: 'text.secondary',
}

export const valueSx: SxProps<Theme> = {
  fontWeight: 'medium',
}

export const buttonGroupSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  mt: 4,
}

export const cancelButtonSx: SxProps<Theme> = {
  color: 'secondary.main',
}

export const saveButtonSx: SxProps<Theme> = {
  backgroundColor: 'primary.main',
  color: 'white',
  '&:hover': {
    backgroundColor: 'primary.dark',
  },
}
