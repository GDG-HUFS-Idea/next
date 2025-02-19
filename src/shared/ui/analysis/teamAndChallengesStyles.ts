export const styles = {
  opportunityList: {
    width: '45%',
    flexGrow: 1,
    backgroundColor: '#F9FAFB',
    paddingBottom: '24px',
  },
  opportunityCard: {
    flex: '1 1 48%',
    padding: '8px',
    borderRadius: '8px',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',

    '&:hover': {
      transform: 'scale(1.03)', // ✅ 마우스 오버 시 약간 커지는 효과
      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)', // ✅ 그림자 강조
    },
  },
}
