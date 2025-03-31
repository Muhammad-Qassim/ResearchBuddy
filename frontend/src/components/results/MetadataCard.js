import { Card, CardContent, Box, Typography, Avatar, Divider, Button, alpha, Tooltip } from "@mui/material"
import { Article, Person, CalendarToday, MenuBook, Link as LinkIcon, Download, Info } from "@mui/icons-material"

const MetadataCard = ({ metadata }) => {
  console.log("Rendering MetadataCard with metadata:", metadata)

  // Handle potential missing fields
  const {
    title = "No title available",
    authors = [],
    year = "N/A",
    DOI = "N/A",
    citationCount = "N/A",
    arxivId = "N/A",
    URL = "#",
    venue = "N/A",
    abstract = "",
  } = metadata || {}

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        backgroundColor: alpha("#1e1e1e", 0.5),
        border: `1px solid ${alpha("#ffca00", 0.2)}`,
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            sx={{
              bgcolor: alpha("#ffca00", 0.1),
              color: "#ffca00",
              width: 50,
              height: 50,
              mr: 2,
            }}
          >
            <Article />
          </Avatar>
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", color: "#ffca00" }}>
            Paper Metadata
          </Typography>
        </Box>

        <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.1)" }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: "bold", mb: 1 }}>
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
          <Person sx={{ color: "#00bcd4", mr: 1, mt: 0.5 }} />
          <Typography variant="body1" sx={{ color: alpha("#ffffff", 0.7) }}>
            <Box component="span" sx={{ color: "#00bcd4", fontWeight: "bold", mr: 1 }}>
              Authors:
            </Box>
            {authors.length > 0 ? authors.join(", ") : "No authors listed"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <CalendarToday sx={{ color: "#00bcd4", mr: 1 }} />
          <Typography variant="body1" sx={{ color: alpha("#ffffff", 0.7) }}>
            <Box component="span" sx={{ color: "#00bcd4", fontWeight: "bold", mr: 1 }}>
              Year:
            </Box>
            {year}
          </Typography>
        </Box>

        {venue && venue !== "N/A" && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <MenuBook sx={{ color: "#00bcd4", mr: 1 }} />
            <Typography variant="body1" sx={{ color: alpha("#ffffff", 0.7) }}>
              <Box component="span" sx={{ color: "#00bcd4", fontWeight: "bold", mr: 1 }}>
                Venue:
              </Box>
              {venue}
            </Typography>
          </Box>
        )}

        {DOI && DOI !== "N/A" && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LinkIcon sx={{ color: "#00bcd4", mr: 1 }} />
            <Typography variant="body1" sx={{ color: alpha("#ffffff", 0.7) }}>
              <Box component="span" sx={{ color: "#00bcd4", fontWeight: "bold", mr: 1 }}>
                DOI:
              </Box>
              {DOI}
            </Typography>
          </Box>
        )}

        {citationCount && citationCount !== "N/A" && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <MenuBook sx={{ color: "#00bcd4", mr: 1 }} />
            <Typography variant="body1" sx={{ color: alpha("#ffffff", 0.7) }}>
              <Box component="span" sx={{ color: "#00bcd4", fontWeight: "bold", mr: 1 }}>
                Citations:
              </Box>
              {citationCount}
            </Typography>
          </Box>
        )}

        {arxivId && arxivId !== "N/A" && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <LinkIcon sx={{ color: "#00bcd4", mr: 1 }} />
            <Typography variant="body1" sx={{ color: alpha("#ffffff", 0.7) }}>
              <Box component="span" sx={{ color: "#00bcd4", fontWeight: "bold", mr: 1 }}>
                ArXiv ID:
              </Box>
              {arxivId}
            </Typography>
          </Box>
        )}

        {abstract && (
          <Box sx={{ mb: 3 }}>
            <Tooltip title="Click to expand/collapse abstract">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  mb: 1,
                }}
                onClick={() => {
                  const abstractEl = document.getElementById("paper-abstract")
                  if (abstractEl) {
                    abstractEl.style.display = abstractEl.style.display === "none" ? "block" : "none"
                  }
                }}
              >
                <Info sx={{ color: "#00bcd4", mr: 1 }} />
                <Typography variant="body1" sx={{ color: "#00bcd4", fontWeight: "bold" }}>
                  Abstract
                </Typography>
              </Box>
            </Tooltip>
            <Box
              id="paper-abstract"
              sx={{
                display: "none",
                p: 2,
                backgroundColor: alpha("#ffffff", 0.05),
                borderRadius: "8px",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
                {abstract}
              </Typography>
            </Box>
          </Box>
        )}

        {URL && URL !== "#" && (
          <Button
            variant="contained"
            component="a"
            href={URL}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<Download />}
            fullWidth
            sx={{
              backgroundColor: "#ffca00",
              color: "rgb(15 23 42)",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: alpha("#ffca00", 0.8),
              },
            }}
          >
            Download PDF
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default MetadataCard

