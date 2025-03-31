import { Box, Container, Typography, alpha } from "@mui/material"

const SimpleFooter = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        backgroundColor: alpha("#1e1e1e", 0.5),
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.5) }}>
            © {currentYear} Research Buddy. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.5), mt: { xs: 1, sm: 0 } }}>
            Made with{" "}
            <Box component="span" sx={{ color: "#e91e63" }}>
              ♥
            </Box>{" "}
            for researchers
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default SimpleFooter

