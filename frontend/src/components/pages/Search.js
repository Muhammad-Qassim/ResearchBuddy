import { useState } from "react"
import { Box, Container, Typography, Button, alpha, Checkbox, FormGroup, FormControlLabel } from "@mui/material"
import { Explore, MenuBook, GitHub } from "@mui/icons-material"
import MainLayout from "../layout/MainLayout"
import Hexagon from "../common/Hexagon"
import GradientText from "../common/GradientText"
import SearchBar from "../search/SearchBar"
import { useNavigate } from "react-router-dom"

function Search() {
  const [query, setQuery] = useState("")
  const [searchTypes, setSearchTypes] = useState({
    papers: true,
    github: true,
  })
  const navigate = useNavigate()

  const exampleSearches = {
    papers: ["Quantum Computing", "Machine Learning", "Unet", "Neural Networks", "AI in Healthcare"],
    github: ["React", "TensorFlow", "Next.js", "Python", "Machine Learning"],
    both: ["Machine Learning", "Neural Networks", "Data Science", "AI", "Computer Vision"],
  }

  const handleSearchTypeChange = (event) => {
    setSearchTypes({
      ...searchTypes,
      [event.target.name]: event.target.checked,
    })
  }

  const handleExampleClick = (example) => {
    setQuery(example)
    navigate(`/results?query=${encodeURIComponent(example)}&papers=${searchTypes.papers}&github=${searchTypes.github}`)
  }

  const handleSearch = (newQuery) => {
    navigate(`/results?query=${encodeURIComponent(newQuery)}&papers=${searchTypes.papers}&github=${searchTypes.github}`)
  }

  const getExampleSearches = () => {
    if (searchTypes.papers && searchTypes.github) return exampleSearches.both
    if (searchTypes.papers) return exampleSearches.papers
    if (searchTypes.github) return exampleSearches.github
    return []
  }

  // Get placeholder text based on selected search types
  const getPlaceholderText = () => {
    if (searchTypes.papers && searchTypes.github) return "Search for research papers and GitHub repositories..."
    if (searchTypes.papers) return "Search for research papers..."
    if (searchTypes.github) return "Search for GitHub repositories..."
    return "Please select at least one search type..."
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

            <Box sx={{ width: "100%", mb: 4 }}>
              <FormGroup row sx={{ justifyContent: "center", gap: 4 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={searchTypes.papers}
                      onChange={handleSearchTypeChange}
                      name="papers"
                      sx={{
                        color: alpha("#00bcd4", 0.7),
                        "&.Mui-checked": {
                          color: "#00bcd4",
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <MenuBook sx={{ color: "#00bcd4" }} />
                      <Typography sx={{ color: alpha("#ffffff", 0.9) }}>Research Papers</Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={searchTypes.github}
                      onChange={handleSearchTypeChange}
                      name="github"
                      sx={{
                        color: alpha("#6e5494", 0.7),
                        "&.Mui-checked": {
                          color: "#6e5494",
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <GitHub sx={{ color: "#6e5494" }} />
                      <Typography sx={{ color: alpha("#ffffff", 0.9) }}>GitHub Repositories</Typography>
                    </Box>
                  }
                />
              </FormGroup>
            </Box>

            <SearchBar
              initialQuery={query}
              onSearch={handleSearch}
              variant="large"
              placeholder={getPlaceholderText()}
              disabled={!searchTypes.papers && !searchTypes.github}
            />

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
               Search for any research topic and get comprehensive summaries by Buddy.
                Please select at least one search type above to begin.
            </Typography>

            {(searchTypes.papers || searchTypes.github) && (
              <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
                {getExampleSearches().map((example) => (
                  <Button
                    key={example}
                    variant="outlined"
                    size="small"
                    onClick={() => handleExampleClick(example)}
                    sx={{
                      borderColor: alpha(
                        searchTypes.papers && searchTypes.github
                          ? "#ffffff"
                          : searchTypes.papers
                            ? "#00bcd4"
                            : "#6e5494",
                        0.3,
                      ),
                      color: alpha("#ffffff", 0.9),
                      borderRadius: "16px",
                      textTransform: "none",
                      px: 2,
                      "&:hover": {
                        borderColor:
                          searchTypes.papers && searchTypes.github
                            ? "#ffffff"
                            : searchTypes.papers
                              ? "#00bcd4"
                              : "#6e5494",
                        backgroundColor: alpha(
                          searchTypes.papers && searchTypes.github
                            ? "#ffffff"
                            : searchTypes.papers
                              ? "#00bcd4"
                              : "#6e5494",
                          0.1,
                        ),
                      },
                    }}
                  >
                    {example}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </MainLayout>
  )
}

export default Search
