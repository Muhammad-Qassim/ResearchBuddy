import { Box, Typography, Avatar, alpha } from "@mui/material"
import { Person, SmartToy } from "@mui/icons-material"
import ReactMarkdown from "react-markdown"

const ChatMessage = ({ message }) => {
  const { text, isUser } = message

  if (!text) {
    console.warn("Message skipped because it has no text:", message)
    return null
  }

  return (
    <Box
      sx={{
        display: "flex",
        mb: 2,
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
      }}
    >
      <Avatar
        sx={{
          bgcolor: isUser ? alpha("#00bcd4", 0.1) : alpha("#6e5494", 0.1),
          color: isUser ? "#00bcd4" : "#6e5494",
          width: 40,
          height: 40,
          mr: isUser ? 0 : 2,
          ml: isUser ? 2 : 0,
        }}
      >
        {isUser ? <Person /> : <SmartToy />}
      </Avatar>

      <Box
        sx={{
          maxWidth: "80%",
          p: 2,
          borderRadius: "12px",
          backgroundColor: isUser ? alpha("#00bcd4", 0.1) : alpha("#6e5494", 0.1),
          border: `1px solid ${isUser ? alpha("#00bcd4", 0.2) : alpha("#6e5494", 0.2)}`,
          color: "#ffffff",
        }}
      >
        {isUser ? (
          <Typography
            variant="body1"
            sx={{
              color: "#ffffff",
              lineHeight: 1.5,
            }}
          >
            {text}
          </Typography>
        ) : (
          <ReactMarkdown
            components={{
              p: (props) => (
                <Typography
                  variant="body1"
                  sx={{
                    color: "#ffffff",
                    lineHeight: 1.6,
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
            {text}
          </ReactMarkdown>
        )}
      </Box>
    </Box>
  )
}

export default ChatMessage
