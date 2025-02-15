export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '24px',
  },
  card: {
    width: '80%',
    maxWidth: '900px',
    padding: '24px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    position: 'relative', // 버튼을 카드 내부에 고정하기 위해 필요
  },
  section: {
    marginBottom: '24px',
  },
  textField: {
    width: '100%',
    marginTop: '12px',
    overflow: 'auto',
  },
  buttonBox: {
    paddingTop: '2%',
    paddingLeft: '52%',
    display: 'grid',
    margin: '0 0',
  },
  startButton: {
    backgroundColor: '#2979ff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    textTransform: 'none' as const,
    maxWidth: '150px', // 너무 커지지 않도록 최대 크기 제한
    minWidth: '100px', // 너무 작아지지 않도록 최소 크기 설정
    '&:hover': {
      backgroundColor: '#1565c0',
    },
  },
  analysisContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px', // 카드 사이 여백 (spacing)
    flexWrap: 'wrap', // 반응형으로 줄 바꿈 가능
    paddingTop: '2%',
    width: '100%',
    maxWidth: '900px',
  },
  analysisCard: {
    flex: '1 1 250px', // 카드가 일정 크기를 유지하면서 자동 정렬
    minWidth: '250px', // 최소 크기 설정
    maxWidth: '300px', // 최대 크기 제한
    padding: '16px',
    textAlign: 'center' as const,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
  },
}
