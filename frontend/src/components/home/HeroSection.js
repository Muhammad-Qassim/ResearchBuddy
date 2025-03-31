import { Box, Container, Typography, Button, Grid, Paper, alpha, Avatar, IconButton } from "@mui/material"
import { ArrowForward, KeyboardArrowDown } from "@mui/icons-material"
import { Link } from "react-router-dom"
import AnimatedDot from "./AnimatedDot"

const HeroSection = () => {
  return (
    <Box
      id="hero"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        pt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} sx={{ position: "relative", zIndex: 2 }}>
            <Box sx={{ position: "relative",}}>
              <Typography
                variant="overline"
                sx={{
                  color: "#00bcd4",
                  letterSpacing: 4,
                  fontFamily: "Courier New",
                  display: "block",
                  mb: 2,
                }}
              >
                AI-POWERED RESEARCH
              </Typography>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: "#ffca00",
                  fontFamily: "arial",
                  fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                  lineHeight: 1.2,
                  mb: 3,
                }}
              >
                Discover Insights <br />
                <Box component="span" sx={{ color: "#ffffff" }}>
                  Faster Than Ever
                </Box>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: alpha("#ffffff", 0.7),
                  mb: 4,
                  maxWidth: "500px",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                }}
              >
                Comprehensive summaries and insights from research papers, code repositories, videos, and forums—all in
                one place, powered by advanced AI.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 6 }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/search"
                  sx={{
                    backgroundColor: "#ffca00",
                    color: "rgb(15 23 42)",
                    borderRadius: "28px",
                    px: 4,
                    py: 1.5,
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: alpha("#ffca00", 0.8),
                    },
                  }}
                  endIcon={<ArrowForward />}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="#features"
                  sx={{
                    borderColor: "#00bcd4",
                    color: "#00bcd4",
                    borderRadius: "28px",
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": {
                      borderColor: "#00bcd4",
                      backgroundColor: alpha("#00bcd4", 0.1),
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex" }}>
                  {[...Array(3)].map((_, i) => (
                    <Avatar
                      key={i}
                      src={`/placeholder-user-${i + 1}.jpg`}
                      sx={{
                        width: 36,
                        height: 36,
                        border: "2px solid rgb(15 23 42)",
                        marginLeft: i > 0 ? "-8px" : 0,
                      }}
                    />
                  ))}
                </Box>
                <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
                  Join{" "}
                  <Box component="span" sx={{ color: "#00bcd4", fontWeight: "bold" }}>
                    1+
                  </Box>{" "}
                  researchers
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                height: { xs: "300px", md: "500px" },
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Terminal-like UI */}
              <Paper
                elevation={24}
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#1e1e1e",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                  position: "relative",
                  transform: "perspective(1000px) rotateY(-5deg) rotateX(5deg)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "perspective(1000px) rotateY(-2deg) rotateX(2deg)",
                  },
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1, mr: 2 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f56" }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27c93f" }} />
                  </Box>
                  <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.7), fontFamily: "Courier New" }}>
                    research-buddy ~ main
                  </Typography>
                </Box>

                <Box sx={{ p: 3, height: "calc(100% - 40px)", overflow: "auto" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#00bcd4",
                      fontFamily: "Courier New",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    $ research-buddy{" "}
                    <Box component="span" sx={{ color: "#ffca00" }}>
                      --analyze
                    </Box>{" "}
                    quantum_computing.pdf
                  </Typography>

                  <Box sx={{ mb: 3, pl: 2, borderLeft: "2px solid rgba(255,255,255,0.1)" }}>
                    <Typography variant="body2" sx={{ color: "#a0a0a0", fontFamily: "Courier New", mb: 1 }}>
                      Analyzing research paper...{" "}
                      <Box component="span" sx={{ color: "#27c93f" }}>
                        complete
                      </Box>
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ffffff", fontFamily: "Courier New", mb: 1 }}>
                      Title: "Quantum Computing: Recent Breakthroughs and Future Applications"
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ffffff", fontFamily: "Courier New", mb: 1 }}>
                      Authors: Zhang, J., Patel, S., Nakamura, K.
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ffffff", fontFamily: "Courier New" }}>
                      Published: 2023, Journal of Quantum Information
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "#00bcd4",
                      fontFamily: "Courier New",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    $ research-buddy{" "}
                    <Box component="span" sx={{ color: "#ffca00" }}>
                      --summarize
                    </Box>
                  </Typography>

                  <Box sx={{ mb: 3, pl: 2, borderLeft: "2px solid rgba(255,255,255,0.1)" }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "#ffffff", fontFamily: "Courier New", mb: 1, lineHeight: 1.6 }}
                    >
                      This paper presents three major breakthroughs in quantum computing:
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ffffff", fontFamily: "Courier New", mb: 1, pl: 2 }}>
                      1. Novel error correction algorithms reducing qubit decoherence
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ffffff", fontFamily: "Courier New", mb: 1, pl: 2 }}>
                      2. Scalable architecture for quantum processors beyond 1000 qubits
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ffffff", fontFamily: "Courier New", pl: 2 }}>
                      3. Practical applications in drug discovery and materials science
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "#00bcd4",
                      fontFamily: "Courier New",
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    $ research-buddy{" "}
                    <Box component="span" sx={{ color: "#ffca00" }}>
                      --related
                    </Box>
                  </Typography>

                  <Box sx={{ pl: 2, borderLeft: "2px solid rgba(255,255,255,0.1)" }}>
                    <Typography variant="body2" sx={{ color: "#a0a0a0", fontFamily: "Courier New", mb: 1 }}>
                      Finding related resources
                      <Box sx={{ display: "inline-flex", ml: 1 }}>
                        <AnimatedDot delay={0} />
                        <AnimatedDot delay={0.2} />
                        <AnimatedDot delay={0.4} />
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: 4, md: 10 },
            mb: { xs: 2, md: 4 },
          }}
        >
          <IconButton
            component={Link}
            to="#features"
            sx={{
              animation: "bounce 2s infinite",
              "@keyframes bounce": {
                "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
                "40%": { transform: "translateY(-20px)" },
                "60%": { transform: "translateY(-10px)" },
              },
            }}
          >
            <KeyboardArrowDown sx={{ color: "#ffffff" }} />
          </IconButton>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection

