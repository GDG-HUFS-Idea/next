// 스타일 객체
export const styles = {
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '24px',
  },
  tabContainer: {
    display: 'flex',
    borderBottom: '1px solid #e0e0e0',
    mb: 4,
  },
  tab: {
    py: 2,
    px: 4,
    fontWeight: 'bold',
    cursor: 'pointer',
    position: 'relative',
  },
  activeTab: {
    borderBottom: '2px solid #1976d2',
    color: '#1976d2',
  },
  mainCard: {
    p: 4,
    borderRadius: '12px',
    boxShadow:
      'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
    backgroundColor: 'white',
  },
  section: {
    mb: 4,
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    mb: 2,
    fontWeight: 'bold',
  },
  listItem: {
    ml: 2,
    mb: 1,
    color: '#555',
    fontSize: '0.95rem',
  },
  textField: {
    mt: 2,
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    mt: 3,
  },
  startButton: {
    borderRadius: '8px',
    fontWeight: 'bold',
    py: 1,
    px: 3,
    backgroundColor: '#4361ee',
    '&:hover': {
      backgroundColor: '#3a56e0',
    },
  },
  analysisContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 6,
    gap: 2,
  },
  analysisCard: {
    p: 3,
    borderRadius: '12px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    backgroundColor: '#f9fafb',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    },
  },
  analysisIcon: {
    fontSize: '48px',
    mb: 2,
    color: '#4361ee',
  },
  analysisTitle: {
    fontWeight: 'bold',
    mb: 1,
  },
  analysisDesc: {
    color: '#666',
    fontSize: '0.875rem',
  },
}
