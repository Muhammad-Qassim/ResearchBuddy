"use client"

import { useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Link as MuiLink,
  Paper,
  Avatar,
  IconButton,
  Divider,
  useMediaQuery,
  Chip,
  alpha,
} from "@mui/material"
import {
  ArrowForward,
  MenuBook,
  Code,
  Lightbulb,
  Bolt,
  Explore,
  Menu as MenuIcon,
  KeyboardArrowDown,
} from "@mui/icons-material"
import { Link } from "react-router-dom"

// Custom hexagon shape component
const Hexagon = ({ children, size = 80, color = "#ffca00", ...props }) => (
  <Box
    sx={{
      position: "relative",
      width: size,
      height: size * 0.866,
      margin: `${size * 0.433}px 0`,
      backgroundColor: color,
      "&:before, &:after": {
        content: '""',
        position: "absolute",
        width: 0,
        height: 0,
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
      },
      "&:before": {
        bottom: "100%",
        borderBottom: `${size * 0.433}px solid ${color}`,
      },
      "&:after": {
        top: "100%",
        borderTop: `${size * 0.433}px solid ${color}`,
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...props.sx,
    }}
    {...props}
  >
    {children}
  </Box>
)

// Animated gradient text component
const GradientText = ({ children, ...props }) => (
  <Box
    component="span"
    sx={{
      background: "linear-gradient(90deg, #ffca00, #00bcd4, #ffca00)",
      backgroundSize: "200% auto",
      color: "transparent",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      animation: "gradient 8s linear infinite",
      display: "inline-block",
      "@keyframes gradient": {
        "0%": {
          backgroundPosition: "0% center",
        },
        "100%": {
          backgroundPosition: "200% center",
        },
      },
      ...props.sx,
    }}
    {...props}
  >
    {children}
  </Box>
)

// Animated dot component
const AnimatedDot = ({ delay = 0, ...props }) => (
  <Box
    sx={{
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "#00bcd4",
      margin: "0 4px",
      animation: "pulse 1.5s infinite ease-in-out",
      animationDelay: `${delay}s`,
      "@keyframes pulse": {
        "0%": { transform: "scale(0.8)", opacity: 0.5 },
        "50%": { transform: "scale(1.2)", opacity: 1 },
        "100%": { transform: "scale(0.8)", opacity: 0.5 },
      },
      ...props.sx,
    }}
    {...props}
  />
)

function Homepage() {
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useMediaQuery("(max-width:900px)")
  const [activeSection, setActiveSection] = useState("hero")

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)

      // Update active section based on scroll position
      const sections = ["hero", "features", "how-it-works", "get-started"]
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && scrollPosition >= element.offsetTop - 200) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "rgb(15 23 42)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,188,212,0.1) 0%, rgba(0,188,212,0) 70%)",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          left: "10%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,202,0,0.1) 0%, rgba(255,202,0,0) 70%)",
          zIndex: 0,
        }}
      />

      {/* Header/AppBar */}
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          background: scrolled ? "rgba(15, 23, 42, 0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "all 0.3s ease",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Hexagon size={40} color="#ffca00" sx={{ mr: 2 }}>
              <Explore sx={{ color: "rgb(15 23 42)" }} />
            </Hexagon>
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

          {isMobile ? (
            <IconButton color="inherit" edge="end">
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              {["features", "how-it-works", "get-started"].map((section) => (
                <MuiLink
                  key={section}
                  component={Link}
                  to={`#${section}`}
                  underline="none"
                  sx={{
                    color: activeSection === section ? "#00bcd4" : "text.primary",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    position: "relative",
                    fontFamily: "Courier New",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    padding: "4px 0",
                    "&:hover": { color: "#00bcd4" },
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      width: activeSection === section ? "100%" : "0%",
                      height: "2px",
                      bottom: 0,
                      left: 0,
                      backgroundColor: "#00bcd4",
                      transition: "width 0.3s ease",
                    },
                    "&:hover:after": {
                      width: "100%",
                    },
                  }}
                >
                  {section.replace(/-/g, " ")}
                </MuiLink>
              ))}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#00bcd4",
                  borderRadius: "24px",
                  textTransform: "none",
                  px: 3,
                  "&:hover": {
                    backgroundColor: alpha("#00bcd4", 0.8),
                  },
                }}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, position: "relative", zIndex: 1 }}>
        {/* Hero Section */}
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
                <Box sx={{ position: "relative" }}>
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
                    Comprehensive summaries and insights from research papers, code repositories, videos, and forums—all
                    in one place, powered by advanced AI.
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2, mb: 6 }}>
                    <Button
                      variant="contained"
                      size="large"
                      component={Link}
                      to="#get-started"
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

        {/* Features Section */}
        <Box
          id="features"
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
              background:
                "linear-gradient(90deg, rgba(255,202,0,0) 0%, rgba(255,202,0,0.5) 50%, rgba(255,202,0,0) 100%)",
            },
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
              <Chip
                label="KEY FEATURES"
                sx={{
                  backgroundColor: alpha("#ffca00", 0.1),
                  color: "#ffca00",
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
                Supercharge Your Research
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
                Research Buddy brings together multiple sources to provide comprehensive insights, saving you hours of
                reading and analysis.
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {[
                {
                  icon: <MenuBook />,
                  title: "Research Paper Summaries",
                  description: "Get concise summaries of full research papers, saving you hours of reading time.",
                  color: "#ffca00",
                },
                {
                  icon: <Code />,
                  title: "GitHub Repository Analysis",
                  description:
                    "Understand code repositories quickly with structured summaries of their purpose and functionality.",
                  color: "#00bcd4",
                },
                {
                  icon: <Lightbulb />,
                  title: "Stack Overflow FAQs",
                  description: "Access simplified answers to common questions from Stack Overflow, presented clearly.",
                  color: "#ff5722",
                },
                {
                  icon: <Bolt />,
                  title: "YouTube Video Insights",
                  description: "Extract key points from educational videos without watching the entire content.",
                  color: "#e91e63",
                },
              ].map((feature, index) => (
                <Grid item xs={12} md={6} lg={3} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      backgroundColor: alpha(feature.color, 0.05),
                      border: `1px solid ${alpha(feature.color, 0.1)}`,
                      borderRadius: "16px",
                      transition: "all 0.3s ease",
                      overflow: "visible",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: `0 12px 20px -10px ${alpha(feature.color, 0.3)}`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(feature.color, 0.1),
                          color: feature.color,
                          width: 60,
                          height: 60,
                          mb: 2,
                          "& .MuiSvgIcon-root": {
                            fontSize: "2rem",
                          },
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{
                          fontWeight: "bold",
                          color: "#ffffff",
                          mb: 2,
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 8 }}>
              <Card
                elevation={0}
                sx={{
                  backgroundColor: alpha("#00bcd4", 0.05),
                  border: `1px solid ${alpha("#00bcd4", 0.1)}`,
                  borderRadius: "16px",
                  overflow: "hidden",
                  padding: 2,
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Grid container>
                    <Grid item xs={12} md={6} sx={{ p: 4 }}>
                      <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Typography
                          variant="h4"
                          component="h3"
                          gutterBottom
                          sx={{
                            fontWeight: "bold",
                            color: "#ffca00",
                            mb: 2,
                          }}
                        >
                          Related Topics Discovery
                        </Typography>
                        <Typography variant="body1" sx={{ color: alpha("#ffffff", 0.7), mb: 3 }}>
                          Discover related research areas and topics to expand your knowledge base. Our AI identifies
                          connections between topics that might not be immediately obvious.
                        </Typography>
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: "#00bcd4",
                            color: "#00bcd4",
                            alignSelf: "flex-start",
                            borderRadius: "24px",
                            textTransform: "none",
                            "&:hover": {
                              borderColor: "#00bcd4",
                              backgroundColor: alpha("#00bcd4", 0.1),
                            },
                          }}
                        >
                          Learn More
                        </Button>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      sx={{
                        background: "linear-gradient(135deg, rgba(0,188,212,0.1) 0%, rgba(0,188,212,0.3) 100%)",
                        p: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >

                      {/* Topic cards container */}
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          minHeight: 300,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          zIndex: 2,
                        }}
                      >
                        {/* Main topic */}
                        <Paper
                          elevation={6}
                          sx={{
                            backgroundColor: alpha("#ffca00", 0.2),
                            border: "1px solid #ffca00",
                            borderRadius: "12px",
                            p: 2,
                            mb: 3,
                            width: "70%",
                            maxWidth: 250,
                            textAlign: "center",
                            position: "relative",
                            backdropFilter: "blur(5px)",
                            boxShadow: "0 0 20px rgba(255,202,0,0.2)",
                            transform: "translateZ(30px)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateZ(40px) scale(1.05)",
                              boxShadow: "0 0 30px rgba(255,202,0,0.3)",
                            },
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ color: "#ffca00", fontWeight: "bold", fontFamily: "Courier New" }}
                          >
                            Quantum Computing
                          </Typography>
                          <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.7), display: "block", mt: 1 }}>
                            Main Research Topic
                          </Typography>
                        </Paper>

                        {/* Related topics in a circular pattern */}
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: 2,
                            perspective: "1000px",
                          }}
                        >
                          {[
                            { name: "Neural Networks", color: "#00bcd4", relevance: "92% Match" },
                            { name: "Cryptography", color: "#ff33ff", relevance: "87% Match" },
                            { name: "Physics", color: "#4caf50", relevance: "85% Match" },
                            { name: "Algorithms", color: "#ff9800", relevance: "78% Match" },
                          ].map((topic, i) => (
                            <Paper
                              key={i}
                              elevation={3}
                              sx={{
                                backgroundColor: alpha(topic.color, 0.15),
                                border: `1px solid ${alpha(topic.color, 0.3)}`,
                                borderRadius: "8px",
                                p: 1.5,
                                width: { xs: "45%", sm: "40%" },
                                maxWidth: 180,
                                textAlign: "center",
                                transform: `rotateX(${(i % 2) * 5}deg) rotateY(${((i % 3) - 1) * 5}deg) translateZ(${10 + i * 5}px)`,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  transform: `rotateX(0deg) rotateY(0deg) translateZ(${20 + i * 5}px) scale(1.05)`,
                                  boxShadow: `0 10px 20px ${alpha(topic.color, 0.2)}`,
                                  backgroundColor: alpha(topic.color, 0.25),
                                },
                              }}
                            >
                              <Typography variant="subtitle2" sx={{ color: topic.color, fontWeight: "bold" }}>
                                {topic.name}
                              </Typography>
                            
                            </Paper>
                          ))}
                        </Box>

                        {/* "Discover More" button */}
                        <Button
                          variant="text"
                          size="small"
                          sx={{
                            color: "#00bcd4",
                            mt: 3,
                            textTransform: "none",
                            fontSize: "0.8rem",
                            "&:hover": {
                              backgroundColor: "transparent",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Discover these related topics
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Container>
        </Box>

        {/* How It Works Section */}
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
              background:
                "linear-gradient(90deg, rgba(0,188,212,0) 0%, rgba(0,188,212,0.5) 50%, rgba(0,188,212,0) 100%)",
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
              {/* Connecting line */}
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
                {[
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
                ].map((step, index) => (
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

        {/* CTA Section */}
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
              background:
                "linear-gradient(90deg, rgba(255,202,0,0) 0%, rgba(255,202,0,0.5) 50%, rgba(255,202,0,0) 100%)",
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
                  Join me a researcher who save time and gain deeper insights with Research Buddy. Start your
                  journey today.
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    size="large"
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
      </Box>

      {/* Footer */}
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
                  <MuiLink
                    key={item}
                    component={Link}
                    to="#"
                    underline="none"
                    sx={{
                      color: alpha("#ffffff", 0.7),
                      fontSize: "0.9rem",
                      "&:hover": { color: "#00bcd4" },
                    }}
                  >
                    {item}
                  </MuiLink>
                ))}
              </Box>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ color: "#ffca00", mb: 2, fontFamily: "Courier New" }}>
                COMPANY
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {["About", "Contact"].map((item) => (
                  <MuiLink
                    key={item}
                    component={Link}
                    to="#"
                    underline="none"
                    sx={{
                      color: alpha("#ffffff", 0.7),
                      fontSize: "0.9rem",
                      "&:hover": { color: "#00bcd4" },
                    }}
                  >
                    {item}
                  </MuiLink>
                ))}
              </Box>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ color: "#ffca00", mb: 2, fontFamily: "Courier New" }}>
                LEGAL
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {["Terms", "Privacy", "Cookies", "Licenses"].map((item) => (
                  <MuiLink
                    key={item}
                    component={Link}
                    to="#"
                    underline="none"
                    sx={{
                      color: alpha("#ffffff", 0.7),
                      fontSize: "0.9rem",
                      "&:hover": { color: "#00bcd4" },
                    }}
                  >
                    {item}
                  </MuiLink>
                ))}
              </Box>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ color: "#ffca00", mb: 2, fontFamily: "Courier New" }}>
                SUPPORT
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {["Help Center", "Documentation"].map((item) => (
                  <MuiLink
                    key={item}
                    component={Link}
                    to="#"
                    underline="none"
                    sx={{
                      color: alpha("#ffffff", 0.7),
                      fontSize: "0.9rem",
                      "&:hover": { color: "#00bcd4" },
                    }}
                  >
                    {item}
                  </MuiLink>
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
              © {new Date().getFullYear()} Research Buddy. All rights reserved.
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
    </Box>
  )
}

export default Homepage

