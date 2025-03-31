import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Chip, alpha } from "@mui/material"
import { MenuBook, Code, Lightbulb, Bolt } from "@mui/icons-material"

const FeaturesSection = () => {
  const features = [
    {
      icon: <MenuBook />,
      title: "Research Paper Summaries",
      description: "Get concise summaries of full research papers, saving you hours of reading time.",
      color: "#ffca00",
    },
    {
      icon: <Code />,
      title: "GitHub Repository Analysis",
      description: "Understand code repositories quickly with structured summaries of their purpose and functionality.",
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
  ]

  return (
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
          background: "linear-gradient(90deg, rgba(255,202,0,0) 0%, rgba(255,202,0,0.5) 50%, rgba(255,202,0,0) 100%)",
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
          {features.map((feature, index) => (
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

        <RelatedTopicsCard />
      </Container>
    </Box>
  )
}

const RelatedTopicsCard = () => {
  return (
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
              <Box sx={{ 
                height: "100%", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                }}>
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
                <Box
                  component="button"
                  sx={{
                    borderColor: "#00bcd4",
                    color: "#00bcd4",
                    alignSelf: "flex-start",
                    borderRadius: "24px",
                    textTransform: "none",
                    border: "1px solid",
                    background: "transparent",
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    "&:hover": {
                      borderColor: "#00bcd4",
                      backgroundColor: alpha("#00bcd4", 0.1),
                    },
                  }}
                >
                  Learn More
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                p: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <TopicCards />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

const TopicCards = () => {
  const topics = [
    { name: "Quantum Computing", color: "#ffca00", relevance: "Main Topic", isMain: true },
    { name: "Neural Networks", color: "#00bcd4"},
    { name: "Cryptography", color: "#ff33ff"},
    { name: "Physics", color: "#4caf50"},
    { name: "Algorithms", color: "#ff9800"},
  ]

  return (
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
      {topics
        .filter((t) => t.isMain)
        .map((topic, i) => (
          <Box
            key={i}
            sx={{
              backgroundColor: alpha(topic.color, 0.2),
              border: `1px solid ${topic.color}`,
              borderRadius: "12px",
              p: 2,
              mb: 3,
              width: "70%",
              maxWidth: 250,
              textAlign: "center",
              position: "relative",
              backdropFilter: "blur(5px)",
              boxShadow: `0 0 20px ${alpha(topic.color, 0.2)}`,
              transform: "translateZ(30px)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateZ(40px) scale(1.05)",
                boxShadow: `0 0 30px ${alpha(topic.color, 0.3)}`,
              },
            }}
          >
            <Typography variant="h6" sx={{ color: topic.color, fontWeight: "bold", fontFamily: "Courier New" }}>
              {topic.name}
            </Typography>
            <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.7), display: "block", mt: 1 }}>
              {topic.relevance}
            </Typography>
          </Box>
        ))}

      {/* Related topics*/}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          perspective: "1000px",
        }}
      >
        {topics
          .filter((t) => !t.isMain)
          .map((topic, i) => (
            <Box
              key={i}
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
            </Box>
          ))}
      </Box>

      {/* "Discover More" button */}
      <Box
        component="button"
        sx={{
          color: "#00bcd4",
          mt: 3,
          textTransform: "none",
          fontSize: "0.8rem",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        Discover these related topics
      </Box>
    </Box>
  )
}

export default FeaturesSection

