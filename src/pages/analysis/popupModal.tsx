'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'

interface PopupModalProps {
  isOpen: boolean
  onClose: () => void
  selectedData: string | null
}

export default function PopupModal({
  isOpen,
  onClose,
  selectedData,
}: PopupModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>팝업 창</DialogTitle>
      <DialogContent>
        <Typography>이것은 팝업입니다.</Typography>
        {selectedData}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  )
}
