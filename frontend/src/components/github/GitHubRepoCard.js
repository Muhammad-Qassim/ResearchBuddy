import { Card, CardContent, Box, Typography, Avatar, Divider, Button, alpha } from "@mui/material"
import { GitHub, Star, Code, Person, Update } from "@mui/icons-material"

const GitHubRepoCard = ({ repository }) => {
  const {
    name = "No name available",
    owner = "Unknown",
    stars = 0,
    forks = 0,
    url = "#",
    updated_at = null,
  } = repository || {}

  const formattedDate = updated_at ? new Date(updated_at).toLocaleDateString() : "Unknown"

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        backgroundColor: alpha("#1e1e1e", 0.5),
        border: `1px solid ${alpha("#6e5494", 0.2)}`,
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
              bgcolor: alpha("#6e5494", 0.1),
              color: "#6e5494",
              width: 40,
              height: 40,
              mr: 2,
            }}
          >
            <GitHub />
          </Avatar>
          <Typography variant="h6" component="h2" sx={{ fontWeight: "bold", color: "#6e5494" }}>
            Repository
          </Typography>
        </Box>

        <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.1)" }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3, flexGrow: 1 }}>
          <Box>
            <Typography variant="body1" sx={{ color: alpha("#ffffff", 0.9), fontWeight: "bold" }}>
              Repo: {name}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Person sx={{ color: "#6e5494", mr: 1, fontSize: "1rem" }} />
            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
              Owner: {owner}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Star sx={{ color: "#6e5494", mr: 1, fontSize: "1rem" }} />
            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
              Stars: {stars}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Code sx={{ color: "#6e5494", mr: 1, fontSize: "1rem" }} />
            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
              Forks: {forks}
            </Typography>
          </Box>

          {updated_at && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Update sx={{ color: "#6e5494", mr: 1, fontSize: "1rem" }} />
              <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
                Updated: {formattedDate}
              </Typography>
            </Box>
          )}
        </Box>

        <Box>
          <Button
            variant="contained"
            component="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHub />}
            fullWidth
            size="small"
            sx={{
              backgroundColor: "#6e5494",
              color: "#ffffff",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: alpha("#6e5494", 0.8),
              },
            }}
          >
            View Repository
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default GitHubRepoCard
