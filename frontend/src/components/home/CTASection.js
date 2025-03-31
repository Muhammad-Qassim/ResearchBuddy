import { Box, Container, Card, CardContent, Typography, Button, Divider, alpha } from "@mui/material"
import { ArrowForward } from "@mui/icons-material"
import { Link } from "react-router-dom"

const CTASection = () => {
  return (
    <Box
      id="get-started"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, rgba(255,202,0,0) 0%, rgba(255,202,0,0.5) 50%, rgba(255,202,0,0) 100%)",
        },
      }}
    >
      <Container maxWidth="md">
        <Card
          elevation={0}
          sx={{
            backgroundColor: "transparent",
            backgroundImage: "linear-gradient(135deg, rgba(255,202,0,0.05) 0%, rgba(0,188,212,0.05) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "24px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: "center", position: "relative", zIndex: 2 }}>
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
              Ready to Accelerate Your Research?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: alpha("#ffffff", 0.7),
                maxWidth: "700px",
                mx: "auto",
                fontSize: "1.1rem",
                mb: 4,
              }}
            >
              Join researchers who save time and gain deeper insights with Research Buddy. Start your journey today.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
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
                Start Researching Now
              </Button>
              <Button
                variant="outlined"
                size="large"
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
                Watch Demo
              </Button>
            </Box>

            <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.5) }}>
              No credit card required. Free plan available.
            </Typography>
          </CardContent>

          {/* Decorative elements */}
          <Box
            sx={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,202,0,0.1) 0%, rgba(255,202,0,0) 70%)",
              zIndex: 1,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: -30,
              left: -30,
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,188,212,0.1) 0%, rgba(0,188,212,0) 70%)",
              zIndex: 1,
            }}
          />
        </Card>
      </Container>
    </Box>
  )
}

export default CTASection

