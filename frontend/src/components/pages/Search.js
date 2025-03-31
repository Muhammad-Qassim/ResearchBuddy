import { useState } from "react"
import { Box, Container, Typography, Button, alpha } from "@mui/material"
import { Explore } from "@mui/icons-material"
import MainLayout from "../layout/MainLayout"
import Hexagon from "../common/Hexagon"
import GradientText from "../common/GradientText"
import SearchBar from "../search/SearchBar"
import { useNavigate } from "react-router-dom"

function Search() {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
  
    const exampleSearches = ["Quantum Computing", "Machine Learning", "Unet", "Neural Networks" , "AI in Healthcare"]
  
    const handleExampleClick = (example) => {
      setQuery(example)
      navigate(`/results?query=${encodeURIComponent(example)}`)
    }
  
    return (
      <MainLayout simpleFooter={true}>
        <Box
          component="div"
          sx={{
            flexGrow: 1,
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt: 8,
          }}
        >
          <Container maxWidth="md" sx={{ py: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "80vh",
              }}
            >
              {/* Logo and Title */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 6 }}>
                <Hexagon size={60} color="#ffca00" sx={{ mr: 3 }}>
                  <Explore sx={{ color: "rgb(15 23 42)", fontSize: "2rem" }} />
                </Hexagon>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Courier New",
                    letterSpacing: 1,
                  }}
                >
                  Research<GradientText>Buddy</GradientText>
                </Typography>
              </Box>
  
              {/* Search Form */}
              <SearchBar
                initialQuery={query}
                onSearch={(newQuery) => {
                  navigate(`/results?query=${encodeURIComponent(newQuery)}`)
                }}
                variant="large"
              />
  
              {/* Description */}
              <Typography
                variant="body1"
                align="center"
                sx={{
                  color: alpha("#ffffff", 0.7),
                  maxWidth: "800px",
                  mb: 4,
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                }}
              >
                Search for any research topic and get comprehensive summaries by AI.
              </Typography>
  
              {/* Example Searches */}
              <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
                {exampleSearches.map((example) => (
                  <Button
                    key={example}
                    variant="outlined"
                    size="small"
                    onClick={() => handleExampleClick(example)}
                    sx={{
                      borderColor: alpha("#00bcd4", 0.3),
                      color: alpha("#ffffff", 0.9),
                      borderRadius: "16px",
                      textTransform: "none",
                      px: 2,
                      "&:hover": {
                        borderColor: "#00bcd4",
                        backgroundColor: alpha("#00bcd4", 0.1),
                      },
                    }}
                  >
                    {example}
                  </Button>
                ))}
              </Box>
            </Box>
          </Container>
        </Box>
      </MainLayout>
    )
  }
  
  export default Search
  
  