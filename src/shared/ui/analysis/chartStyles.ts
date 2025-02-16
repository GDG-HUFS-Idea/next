export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '16px',
  },
  chartCard: {
    width: '100%',
    maxWidth: '600px',
    padding: '16px',
    textAlign: 'center' as const,
    borderRadius: '12px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    transition:
      'transform 0.3s ease-out, box-shadow 0.3s ease-out, opacity 0.5s ease-in', // ✅ 트랜지션 추가
    animation: 'fadeIn 0.8s forwards', // ✅ 등장 애니메이션
    '&:hover': {
      transform: 'scale(1.03)', // ✅ 마우스 오버 시 약간 커지는 효과
      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)', // ✅ 그림자 강조
    },
  },
  chartTitle: {
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
}
