import { Card, CardContent, Box, Typography, Avatar, Divider, Chip, alpha } from "@mui/material"
import { Public } from "@mui/icons-material"

const RelatedTopicsCard = ({ relatedTopics = [], onTopicClick }) => {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        backgroundColor: alpha("#1e1e1e", 0.5),
        border: `1px solid ${alpha("#3f51b5", 0.2)}`,
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
              bgcolor: alpha("#3f51b5", 0.1),
              color: "#3f51b5",
              width: 40,
              height: 40,
              mr: 2,
            }}
          >
            <Public />
          </Avatar>
          <Typography variant="h6" component="h2" sx={{ fontWeight: "bold", color: "#3f51b5" }}>
            Related
          </Typography>
        </Box>

        <Divider sx={{ mb: 5, borderColor: "rgba(255,255,255,0.1)" }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mb: 3, flexGrow: 1 }}>
          {relatedTopics.length > 0 ? (
            relatedTopics.map((topic, index) => (
              <Chip
                key={index}
                label={topic}
                onClick={() => onTopicClick && onTopicClick(topic)}
                sx={{
                  backgroundColor: alpha("#3f51b5", 0.1),
                  color: "#ffffff",
                  borderRadius: "8px",
                  padding: "20px 10px",
                  height: "auto",
                  "& .MuiChip-label": {
                    padding: "6px 0",
                    fontSize: "0.9rem",
                  },
                  "&:hover": {
                    backgroundColor: alpha("#3f51b5", 0.2),
                  },
                }}
              />
            ))
          ) : (
            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7), fontStyle: "italic" }}>
              No related topics found.
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default RelatedTopicsCard
