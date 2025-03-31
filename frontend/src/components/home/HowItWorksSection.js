import { Box, Container, Typography, Grid, Chip, Button, alpha } from "@mui/material"
import { ArrowForward } from "@mui/icons-material"

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Input Your Topic",
      description: "Enter your research topic or question to begin the discovery process.",
      color: "#ffca00",
    },
    {
      number: "02",
      title: "AI Processing",
      description: "Our AI searches and analyzes content from papers, repositories, videos, and forums.",
      color: "#00bcd4",
    },
    {
      number: "03",
      title: "Structured Results",
      description: "Receive organized insights and summaries to accelerate your research process.",
      color: "#e91e63",
    },
  ]

  return (
    <Box
      id="how-it-works"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        backgroundColor: alpha("#1e1e1e", 0.5),
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, rgba(0,188,212,0) 0%, rgba(0,188,212,0.5) 50%, rgba(0,188,212,0) 100%)",
        },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
          <Chip
            label="HOW IT WORKS"
            sx={{
              backgroundColor: alpha("#00bcd4", 0.1),
              color: "#00bcd4",
              mb: 2,
              fontFamily: "Courier New",
              borderRadius: "4px",
            }}
          />
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: "bold",
              color: "#ffca00",
              fontFamily: "arial",
              fontSize: { xs: "2rem", md: "2.5rem" },
              mb: 2,
            }}
          >
            Streamlined Research Process
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: alpha("#ffffff", 0.7),
              maxWidth: "700px",
              mx: "auto",
              fontSize: "1.1rem",
            }}
          >
            Research Buddy uses advanced AI to gather and process information from multiple sources, delivering
            structured insights in seconds.
          </Typography>
        </Box>

        <Box sx={{ position: "relative", my: 8 }}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "10%",
              right: "10%",
              height: "2px",
              background: "linear-gradient(90deg, #ffca00, #00bcd4)",
              display: { xs: "none", md: "block" },
              zIndex: 1,
            }}
          />

          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 2,
                    backgroundColor: alpha("#1e1e1e", 0.8),
                    borderRadius: "16px",
                    p: 4,
                    border: `1px solid ${alpha(step.color, 0.2)}`,
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 12px 20px -10px ${alpha(step.color, 0.3)}`,
                    },
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      color: alpha(step.color, 0.1),
                      fontWeight: 900,
                      fontSize: "6rem",
                      position: "absolute",
                      top: -20,
                      right: 10,
                      zIndex: -1,
                    }}
                  >
                    {step.number}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: step.color,
                      mb: 2,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: alpha("#ffffff", 0.7) }}>
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 10, textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#00bcd4",
              borderRadius: "28px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: alpha("#00bcd4", 0.8),
              },
            }}
            endIcon={<ArrowForward />}
          >
            See How It Works
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default HowItWorksSection

