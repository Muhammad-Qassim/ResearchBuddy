import { Card, CardContent, Box, Typography, Avatar, Divider, Paper, alpha } from "@mui/material"
import { MenuBook } from "@mui/icons-material"

const SummaryCard = ({ summary }) => {
  // Format the summary text for better readability if it exists
  const formattedSummary = summary ? summary.replace(/\n/g, "\n\n") : "No summary available for this paper."

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        backgroundColor: alpha("#1e1e1e", 0.5),
        border: `1px solid ${alpha("#00bcd4", 0.2)}`,
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            sx={{
              bgcolor: alpha("#00bcd4", 0.1),
              color: "#00bcd4",
              width: 50,
              height: 50,
              mr: 2,
            }}
          >
            <MenuBook />
          </Avatar>
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", color: "#00bcd4" }}>
            Paper Summary
          </Typography>
        </Box>

        <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.1)" }} />

        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: alpha("#ffffff", 0.03),
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.05)",
            maxHeight: "600px",
            overflow: "auto",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: alpha("#ffffff", 0.9),
              lineHeight: 1.8,
              whiteSpace: "pre-line",
            }}
          >
            {formattedSummary}
          </Typography>
        </Paper>
      </CardContent>
    </Card>
  )
}

export default SummaryCard

