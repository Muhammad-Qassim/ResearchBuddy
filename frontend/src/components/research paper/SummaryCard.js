import { Card, CardContent, Box, Typography, Avatar, Divider, Paper, alpha } from "@mui/material"
import { MenuBook } from "@mui/icons-material"
import ReactMarkdown from "react-markdown"

function normalizeSummary(summary) {
  if (!summary) return "No summary available for this paper."

  const headingMap = {
    "main research objective": "Main Research Objective",
    "research objective": "Main Research Objective",
    "methodology": "Methodology",
    "key findings": "Key Findings",
    "findings": "Key Findings",
    "conclusions": "Conclusions",
    "conclusion": "Conclusions",
  }

  return summary
    // Remove numbered prefixes like 1. or **2.
    .replace(/(\*\*\s*)?\d+\.\s*/g, "")
    // Remove trailing or broken asterisks
    .replace(/\*{2,}/g, "")
    // Use proper markdown headings
    .replace(
      /(Main Research Objective|Research Objective|Methodology|Key Findings|Findings|Conclusions|Conclusion)\s*:?(\s*\*)?/gi,
      (_, heading) => `\n### ${headingMap[heading.toLowerCase()]}\n`
    )
    // Break up inline bullet points
    .replace(/(?<!\n)\s*\*\s+/g, "\n* ")
    // Split and clean up
    .split("\n")
    .map(line => {
      const trimmed = line.trim()
      if (trimmed.startsWith("###") || trimmed.startsWith("*")) return trimmed
      if (trimmed.length > 0) return `* ${trimmed}`
      return ""
    })
    .filter(line => line.length > 0)
    .join("\n\n")
}








const SummaryCard = ({ summary }) => {
  const formattedSummary = normalizeSummary(summary)

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
      <CardContent sx={{ p: 3, paddingBottom: 0, flexGrow: 0 }}>
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
            <MenuBook />
          </Avatar>
          <Typography variant="h6" component="h2" sx={{ fontWeight: "bold", color: "#00bcd4" }}>
            Paper Summary
          </Typography>
        </Box>

        <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.1)" }} />
      </CardContent>

      <Box sx={{ p: 3, pt: 0, flexGrow: 1, overflow: "hidden" }}>
        <Paper
          elevation={0}
          sx={{
            p:3,
            paddingTop: 0,
            backgroundColor: alpha("#ffffff", 0.03),
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.05)",
            height: "500px",
            overflow: "auto",
          }}
        >
          <ReactMarkdown
            components={{
              p: (props) => (
                <Typography
                  variant="body1"
                  sx={{
                    color: alpha("#ffffff", 0.9),
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                  {...props}
                />
              ),
              h1: (props) => (
                <Typography
                  variant="h5"
                  sx={{
                    color: "#00bcd4",
                    fontWeight: "bold",
                    mt: 3,
                    mb: 2,
                  }}
                  {...props}
                />
              ),
              h2: (props) => (
                <Typography
                  variant="h6"
                  sx={{
                    color: "#00bcd4",
                    fontWeight: "bold",
                    mt: 2,
                    mb: 1,
                  }}
                  {...props}
                />
              ),
              ul: (props) => <Box component="ul" sx={{ pl: 2, mb: 2 }} {...props} />,
              li: (props) => (
                <Typography
                  component="li"
                  variant="body1"
                  sx={{
                    color: alpha("#ffffff", 0.9),
                    mb: 1,
                  }}
                  {...props}
                />
              ),
              code: (props) => (
                <Box
                  component="code"
                  sx={{
                    backgroundColor: alpha("#000000", 0.3),
                    padding: "2px 4px",
                    borderRadius: "4px",
                    fontFamily: "monospace",
                  }}
                  {...props}
                />
              ),
            }}
          >
            {formattedSummary}
          </ReactMarkdown>
        </Paper>
      </Box>
    </Card>
  )
}

export default SummaryCard
