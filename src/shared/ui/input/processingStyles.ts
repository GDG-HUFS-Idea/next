// shared/ui/input/processingStyles.ts

export const processingStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh',
    padding: '2rem',
  },
  progressContainer: {
    position: 'relative',
    display: 'inline-flex',
    marginBottom: '2rem',
  },
  backgroundProgress: {
    color: '#e8eaf6', // 밝은 배경색
  },
  foregroundProgress: {
    position: 'absolute',
    left: 0,
    color: '#7986cb', // 강조색
  },
  progressTextContainer: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  titleText: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#2c3e50',
  },
  messageText: {
    color: '#7f8c8d',
    marginBottom: '2rem',
  },
  resultCard: {
    padding: '1.5rem',
    maxWidth: '600px',
    width: '100%',
    marginTop: '4rem',
  },
  resultProjectName: {
    marginBottom: '0.5rem',
  },
  resultFooter: {
    marginTop: '2rem',
  },
  resultFooterText: {
    color: 'text.secondary',
  },
}
