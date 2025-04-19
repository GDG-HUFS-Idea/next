// shared/ui/input/inputStyles.ts

export const styles = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },

  // 입력 카드 스타일
  card: {
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },

  // 섹션 스타일
  section: {
    marginBottom: '2rem',
    '& ul': {
      paddingLeft: '1.5rem',
      marginBottom: '1rem',
    },
    '& li': {
      marginBottom: '0.5rem',
    },
  },

  // 텍스트 필드 스타일
  textField: {
    width: '100%',
    marginTop: '1rem',
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
    },
  },

  // 버튼 컨테이너
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '3rem',
  },

  // 시작 버튼 스타일
  startButton: {
    padding: '0.75rem 2.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'none',
    borderRadius: '50px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    minWidth: '200px',
  },

  // 분석 컨테이너
  analysisContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: '1.5rem',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // 분석 카드 스타일
  analysisCard: {
    padding: '1.5rem',
    flex: { xs: '1 0 100%', md: '1 0 30%' },
    borderRadius: '8px',
    minHeight: '150px',
    display: 'flex',
    flexDirection: 'column',
    '& h6': {
      marginBottom: '0.75rem',
    },
  },
}
