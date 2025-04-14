import { useState, useEffect } from "react"
import { Container, Paper, Typography, Button, Box, alpha, Alert, CircularProgress } from "@mui/material"
import { ArrowBack, Refresh } from "@mui/icons-material"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { processQuery, testConnection } from "../services/api"
import MainLayout from "../layout/MainLayout"
import SearchBar from "../search/SearchBar"
import LoadingAnimation from "../common/LoadingAnimation"
import PaginatedResults from "../results/PaginatedResults"

function Results() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [results, setResults] = useState([])
  const [apiStatus, setApiStatus] = useState({ checked: false, online: false })
  const navigate = useNavigate()
  const location = useLocation()

  // Check API connection on component mount
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        await testConnection()
        setApiStatus({ checked: true, online: true })
      } catch (err) {
        console.error("API connection error:", err)
        setApiStatus({ checked: true, online: false })
      }
    }

    checkApiConnection()
  }, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const queryParam = searchParams.get("query")

    if (queryParam) {
      setQuery(queryParam)
      if (apiStatus.online) {
        fetchResults(queryParam)
      } else if (apiStatus.checked) {
        setError("API server is offline. Please try again later.")
      }
    }
  }, [location.search, apiStatus])

  const fetchResults = async (searchQuery) => {
    setLoading(true)
    setError(null)
    setResults([])

    try {
      console.log("Fetching results for query:", searchQuery)
      const data = await processQuery(searchQuery)
      console.log("API response:", data)

      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error("No results found for this query")
      }

      setResults(data)
    } catch (err) {
      console.error("Error fetching results:", err)
      setError(err.message || "An error occurred while fetching results")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (newQuery) => {
    navigate(`/results?query=${encodeURIComponent(newQuery)}`)
  }

  const handleRetry = () => {
    if (query) {
      fetchResults(query)
    }
  }

  return (
    <MainLayout simpleFooter={true}>
      <Box component="div" sx={{ flexGrow: 1, position: "relative", zIndex: 1, pt: 10 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 2,
              backgroundColor: alpha("#1e1e1e", 0.5),
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <SearchBar initialQuery={query} onSearch={handleSearch} variant="compact" />

            {!apiStatus.checked && (
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <CircularProgress size={20} sx={{ color: "#00bcd4", mr: 1 }} />
                <Typography sx={{ color: alpha("#ffffff", 0.7) }}>Checking API connection...</Typography>
              </Box>
            )}

            {apiStatus.checked && !apiStatus.online && (
              <Alert severity="error" sx={{ mt: 2, backgroundColor: alpha("#f44336", 0.1), color: "#f44336" }}>
                API server is offline. Please ensure the backend is running at{" "}
                {process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:5000"}
              </Alert>
            )}

            {error && (
              <Alert
                severity="error"
                sx={{ mt: 2, backgroundColor: alpha("#f44336", 0.1), color: "#f44336" }}
                action={
                  <Button color="inherit" size="small" onClick={handleRetry} startIcon={<Refresh />}>
                    Retry
                  </Button>
                }
              >
                {error}
              </Alert>
            )}
          </Paper>

          {loading && <LoadingAnimation />}

          {!loading && results.length > 0 && <PaginatedResults results={results} />}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Button
              variant="outlined"
              component={Link}
              to="/search"
              startIcon={<ArrowBack />}
              sx={{
                borderColor: "#00bcd4",
                color: "#00bcd4",
                borderRadius: "24px",
                px: 4,
                py: 1,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#00bcd4",
                  backgroundColor: alpha("#00bcd4", 0.1),
                },
              }}
            >
              Back to Search
            </Button>
          </Box>
        </Container>
      </Box>
    </MainLayout>
  )
}

export default Results

