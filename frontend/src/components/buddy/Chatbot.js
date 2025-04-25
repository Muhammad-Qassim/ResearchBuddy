import { useState, useEffect, useRef } from "react"
import { Box, TextField, Paper, Typography, alpha, CircularProgress, IconButton, Avatar } from "@mui/material"
import { Send, SmartToy } from "@mui/icons-material"
import ChatMessage from "./ChatMessage"
import ReactMarkdown from "react-markdown"
import { initChatbot, queryChatbot } from "../services/api"

const ChatBot = ({ topic = "research" }) => {
  
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [currentResponse, setCurrentResponse] = useState("")

  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  useEffect(() => {
    const initChat = async () => {
      try {
        const data = await initChatbot(topic)
        setMessages([{ text: data.message, isUser: false }])
      } catch (error) {
        console.error("Error initializing chat:", error)
        setMessages([
          {
            text: `Welcome to ResearchBuddy! I'm here to help you with information about "${topic}". What would you like to know?`,
            isUser: false,
          },
        ])
      }
    }

    initChat()
  }, [topic])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, currentResponse])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }])
    setIsLoading(true)
    setIsTyping(true)
    setCurrentResponse("")

    try {
      console.log(`Sending query: "${userMessage}" with topic: "${topic}"`)

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/chatbot/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userMessage,
          topic: topic,
        }),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let botResponse = ""

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          console.log("Stream complete")
          break
        }

        const chunk = decoder.decode(value, { stream: true })
        console.log("Received chunk:", chunk)

        const lines = chunk.split("\n\n")
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.substring(6)
            console.log("Parsed data:", data)

            if (data === "[END]") {
              console.log("End of stream detected")
              setIsTyping(false)
              setIsLoading(false)
              setMessages((prev) => [...prev, { text: botResponse.trim(), isUser: false }])
              setCurrentResponse("")
              return
            } else {
              botResponse += data
                .replace(/\\n/g, "\n")         
                .replace(/\\+/g, "")   
                .replace(/\n{3,}/g, "\n\n") + "\n";
              setCurrentResponse(botResponse)
            }
          }
        }
      }

      console.log("Stream ended without [END] marker")
      setIsTyping(false)
      setIsLoading(false)
      if (botResponse.trim()) {
        setMessages((prev) => [...prev, { text: botResponse.trim(), isUser: false }])
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "I'm sorry, I couldn't generate a response. Please try again.", isUser: false },
        ])
      }
      setCurrentResponse("")
    } catch (error) {
      console.error("Error sending message:", error)
      setIsTyping(false)
      setIsLoading(false)
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm sorry, I encountered an error while processing your request. Please try again.",
          isUser: false,
        },
      ])
    }
  }

  return (
    <Paper
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
      <Box
        sx={{
          p: 3,
          borderBottom: `1px solid ${alpha("#ffffff", 0.1)}`,
          display: "flex",
          alignItems: "center",
        }}
      >
        <SmartToy sx={{ color: "#6e5494", mr: 2 }} />
        <Typography variant="h6" sx={{ color: "#6e5494", fontWeight: "bold" }}>
          Research Buddy
        </Typography>
      </Box>

      <Box
        ref={chatContainerRef}
        sx={{
          p: 3,
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        {isTyping && (
          <Box
            sx={{
              display: "flex",
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: alpha("#6e5494", 0.1),
                color: "#6e5494",
                width: 40,
                height: 40,
                mr: 2,
              }}
            >
              <SmartToy />
            </Avatar>
            <Box
              sx={{
                maxWidth: "80%",
                p: 2,
                borderRadius: "12px",
                backgroundColor: alpha("#6e5494", 0.1),
                border: `1px solid ${alpha("#6e5494", 0.2)}`,
              }}
            >
              <ReactMarkdown
                components={{
                  p: (props) => (
                    <Typography
                      variant="body1"
                      sx={{
                        color: alpha("#ffffff", 0.9),
                        lineHeight: 1.6,
                        mb: 1,
                      }}
                      {...props}
                    />
                  ),
                }}
              >
                {currentResponse || "..."}
              </ReactMarkdown>
            </Box>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>

      <Box
        component="form"
        onSubmit={handleSendMessage}
        sx={{
          p: 2,
          borderTop: `1px solid ${alpha("#ffffff", 0.1)}`,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          placeholder={`Ask me anything about ${topic}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: alpha("#ffffff", 0.05),
              borderRadius: "8px",
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.1)",
              },
              "&:hover fieldset": {
                borderColor: "#6e5494",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6e5494",
              },
            },
            "& .MuiInputBase-input": {
              color: "#ffffff",
            },
          }}
        />
        <IconButton
          type="submit"
          disabled={!input.trim() || isLoading}
          sx={{
            backgroundColor: "#6e5494",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: alpha("#6e5494", 0.8),
            },
            "&.Mui-disabled": {
              backgroundColor: alpha("#6e5494", 0.3),
              color: alpha("#ffffff", 0.3),
            },
            width: 48,
            height: 48,
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : <Send />}
        </IconButton>
      </Box>
    </Paper>
  )
}

export default ChatBot