import { useState, useEffect } from "react"
import { Box, TextField, Button, Paper, alpha } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const SearchBar = ({ initialQuery = "", onSearch, variant = "large" }) => {
  const [query, setQuery] = useState(initialQuery)
  const navigate = useNavigate()

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return

    if (onSearch) {
      onSearch(query)
    } else {
      navigate(`/results?query=${encodeURIComponent(query)}`)
    }
  }

  // Large search bar for the search page
  if (variant === "large") {
    return (
      <Paper
        elevation={24}
        sx={{
          width: "100%",
          backgroundColor: alpha("#1e1e1e", 0.7),
          borderRadius: "24px",
          p: 1,
          mb: 2,
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <form onSubmit={handleSearch}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Search for research papers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                mx: 2,
                "& .MuiInput-root": {
                  fontSize: "1.2rem",
                  "&:before, &:after": {
                    display: "none",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#ffffff",
                  py: 1.5,
                  px: 1,
                },
              }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: alpha("#ffffff", 0.7), mr: 1, fontSize: "1.5rem" }} />,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!query.trim()}
              sx={{
                backgroundColor: "#00bcd4",
                borderRadius: "50%",
                minWidth: "unset",
                width: 48,
                height: 48,
                mr: 1,
                "&:hover": {
                  backgroundColor: alpha("#00bcd4", 0.8),
                },
              }}
            >
              <SearchIcon />
            </Button>
          </Box>
        </form>
      </Paper>
    )
  }

  // Compact search bar for the results page
  return (
    <form onSubmit={handleSearch}>
      <Box sx={{ display: "flex", gap: 2, }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter a research topic or paper title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: alpha("#ffffff", 0.05),
              borderRadius: "8px",
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.1)",
              },
              "&:hover fieldset": {
                borderColor: "#00bcd4",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00bcd4",
              },
            },
            "& .MuiInputBase-input": {
              color: "#ffffff",
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!query.trim()}
          sx={{
            backgroundColor: "#00bcd4",
            borderRadius: "8px",
            minWidth: "50px",
            "&:hover": {
              backgroundColor: alpha("#00bcd4", 0.8),
            },
            "& .MuiButton-startIcon": {
              margin: 0,
            },
          }}
          startIcon={<SearchIcon/>}
        ></Button>
      </Box>
    </form>
  )
}

export default SearchBar

