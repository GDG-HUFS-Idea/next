const styles = {
  header: {
    position: 'static',
    color: 'inherit', // 기본 파란색 제거
    elevation: 1,
    backgroundColor: 'white', // 배경색을 흰색으로 설정
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // 약간의 그림자 효과 추가
  } as const,

  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  } as const,

  footer: {
    py: 2,
    textAlign: 'center',
    backgroundColor: 'white',
    boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1)',
  } as const,
}

export default styles
