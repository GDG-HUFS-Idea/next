const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  } as const,

  mainContainer: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: 4,
  } as const,

  gridContainer: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
    gap: 4,
    maxWidth: 800,
    width: "100%",
  } as const,

  leftCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    p: 4,
    textAlign: "center",
  } as const,

  rightCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    p: 4,
  } as const,

  logo: {
    width: 128,
    height: 128,
    marginBottom: 16,
  } as const,

  subtitle: {
    variant: "h6",
    fontWeight: "bold",
    color: "textPrimary",
  } as const,

  naverButton: {
    mb: 2,
    bgcolor: "#03C75A",
    "&:hover": { bgcolor: "#02A74D" },
  } as const,

  kakaoButton: {
    mb: 2,
    bgcolor: "#FEE500",
    color: "black",
    "&:hover": { bgcolor: "#FFD400" },
  } as const,

  googleButton: {
    color: "#374151",
    borderColor: "#D1D5DB",
    "&:hover": { bgcolor: "#F3F4F6" },
  } as const,
};

export default styles;
