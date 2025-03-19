const styles = {
  header: {
    position: 'static',
    color: 'inherit',
    elevation: 1,
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
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
