import { Card, CardContent, Box, Typography, Avatar, Divider, alpha, Button } from "@mui/material"
import { Description } from "@mui/icons-material"
import { Person, CalendarToday, Link as LinkIcon, MenuBook, Info, Download, CalendarMonth } from "@mui/icons-material"


const MetadataCard = ({ metadata }) => {
  // Handle potential missing fields
  const {
    title = "No title available",
    authors = [],
    year = "N/A",
    DOI = "N/A",
    citationCount = "N/A",
    arxivId = "N/A",
    URL = "#",
    abstract = "",
  } = metadata || {}

 return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        backgroundColor: alpha("#1e1e1e", 0.5),
        border: `1px solid ${alpha("#00bcd4", 0.2)}`,
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: alpha("#00bcd4", 0.1),
              color: "#00bcd4",
              width: 40,
              height: 40,
              mr: 2,
            }}
          >
            <Description />
          </Avatar>
          <Typography variant="h6" component="h2" sx={{ fontWeight: "bold", color: "#00bcd4" }}>
            Metadata
          </Typography>
        </Box>

        <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.1)" }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3, flexGrow: 1 }}>
          <Box>
          <Typography variant="body1" sx={{ color: alpha("#ffffff", 0.9), fontWeight: "bold", fontSize: "0.8rem" , textAlign:"center"}}>
              {title}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Person sx={{ color: "#00bcd4", mr: 1, fontSize: "1rem" }} />
            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
            {authors.slice(0, 2).join(", ")}
            {authors.length > 2 && " et al."}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CalendarMonth sx={{ color: "#00bcd4", mr: 1, fontSize: "1rem" }} />
            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
              Year: {year}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MenuBook sx={{ color: "#00bcd4", mr: 1, fontSize: "1rem" }} />
            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
              DOI: {DOI}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CalendarToday sx={{ color: "#00bcd4", mr: 1, fontSize: "1rem" }} />
            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
              Citation Count: {citationCount}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LinkIcon sx={{ color: "#00bcd4", mr: 1, fontSize: "1rem" }} />
            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
              Arxiv ID: {arxivId}
            </Typography>
          </Box>
          

        </Box>

        <Box>
          <Button
            variant="contained"
            component="a"
            href={URL}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<Download />}
            fullWidth
            size="small"
            sx={{
              backgroundColor: "#00bcd4",
              color: "#ffffff",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: alpha("#00bcd4", 0.8),
              },
            }}
          >
            Download PDF
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default MetadataCard
