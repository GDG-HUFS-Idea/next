export const styles = {
  container: {
    width: '100%',
    padding: '16px',
    marginBottom: '24px',
    borderRadius: '12px',
    backgroundColor: '#F9FAFB',
  },
  title: {
    marginBottom: '16px',
    fontWeight: 'bold',
  },
  scrollContainer: {
    display: 'flex',
    flexDirection: 'row', // ✅ 가로 배치
    gap: '16px', // ✅ 카드 간 여백 유지
    overflowX: 'auto', // ✅ 가로 스크롤 적용
    whiteSpace: 'nowrap', // ✅ 카드가 줄바꿈되지 않도록 설정
    paddingBottom: '8px', // ✅ 스크롤 바와의 간격 확보
  },
  serviceCard: {
    minWidth: '250px', // ✅ 카드 최소 너비 설정 (너무 좁아지지 않도록)
    maxWidth: '300px',
    padding: '16px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: 'rgba(213, 253, 199, 0.78)',
    transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
    '&:hover': {
      transform: 'scale(1.03)', // ✅ 마우스 오버 시 확대 효과
      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',
    },
  },
}
