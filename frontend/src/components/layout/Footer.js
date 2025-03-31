import { Box, Container, Typography, Grid, Divider, IconButton, alpha } from "@mui/material"
import { Link } from "react-router-dom"
import GradientText from "../common/GradientText"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: "auto",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        backgroundColor: alpha("#1e1e1e", 0.5),
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Courier New",
                  letterSpacing: 1,
                }}
              >
                Research<GradientText>Buddy</GradientText>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.5), mb: 2 }}>
              Your AI-powered research assistant that generates comprehensive summaries and insights for specific
              topics.
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <IconButton
                  key={social}
                  size="small"
                  sx={{
                    color: alpha("#ffffff", 0.7),
                    "&:hover": { color: "#00bcd4" },
                  }}
                >
                  <Box component="span" sx={{ fontSize: "0.75rem", fontFamily: "Courier New" }}>
                    {social}
                  </Box>
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ color: "#ffca00", mb: 2, fontFamily: "Courier New" }}>
              PRODUCT
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["Features", "Pricing", "Demo", "FAQ"].map((item) => (
                <Link key={item} to="#" style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      color: alpha("#ffffff", 0.7),
                      fontSize: "0.9rem",
                      "&:hover": { color: "#00bcd4" },
                    }}
                  >
                    {item}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ color: "#ffca00", mb: 2, fontFamily: "Courier New" }}>
              COMPANY
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["About", "Contact"].map((item) => (
                <Link key={item} to="#" style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      color: alpha("#ffffff", 0.7),
                      fontSize: "0.9rem",
                      "&:hover": { color: "#00bcd4" },
                    }}
                  >
                    {item}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ color: "#ffca00", mb: 2, fontFamily: "Courier New" }}>
              LEGAL
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["Terms", "Privacy", "Cookies", "Licenses"].map((item) => (
                <Link key={item} to="#" style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      color: alpha("#ffffff", 0.7),
                      fontSize: "0.9rem",
                      "&:hover": { color: "#00bcd4" },
                    }}
                  >
                    {item}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ color: "#ffca00", mb: 2, fontFamily: "Courier New" }}>
              SUPPORT
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["Help Center", "Documentation"].map((item) => (
                <Link key={item} to="#" style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      color: alpha("#ffffff", 0.7),
                      fontSize: "0.9rem",
                      "&:hover": { color: "#00bcd4" },
                    }}
                  >
                    {item}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

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

export default Footer

