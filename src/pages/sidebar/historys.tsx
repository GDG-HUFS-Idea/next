import {
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon,
  List,
} from '@mui/material'
import { History } from 'lucide-react'

const Historys = ({ open }: { open: boolean }) => {
  const historyItems = [
    '화장실 용변시에 사용하는 발..',
    '아이디어 평가 도구',
    '사내 휴가 관리 서비스',
    '임베디드 기반 자동 배달 서..',
  ]

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <History size={20} />
          </ListItemIcon>
          {open && <ListItemText primary="Histories" />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{ maxHeight: '200px', overflowY: 'auto' }}
        >
          {historyItems.map((item, index) => (
            <ListItemButton key={index} sx={{ pl: 4 }}>
              <ListItemText primary={item} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  )
}

export default Historys
