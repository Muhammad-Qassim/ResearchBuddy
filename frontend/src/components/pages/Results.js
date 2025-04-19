import { useState, useEffect } from "react"
import { Typography, Box, alpha, Alert, CircularProgress, Container } from "@mui/material"
import { useLocation } from "react-router-dom"
import { processQuery, processGithubQuery, testConnection } from "../services/api"
import MainLayout from "../layout/MainLayout"
import LoadingAnimation from "../common/LoadingAnimation"
import PaginatedResults from "../results/PaginatedResults"

function Results() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [paperResults, setPaperResults] = useState([])
  const [githubResults, setGithubResults] = useState([])
  const [searchTypes, setSearchTypes] = useState({
    papers: true,
    github: true,
  })
  const [apiStatus, setApiStatus] = useState({ checked: false, online: false })
  const location = useLocation()

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
    const papersParam = searchParams.get("papers")
    const githubParam = searchParams.get("github")

    // Set search types based on URL parameters
    const newSearchTypes = {
      papers: papersParam !== "false",
      github: githubParam !== "false",
    }
    setSearchTypes(newSearchTypes)

    if (queryParam) {
      setQuery(queryParam)
      if (apiStatus.online) {
        fetchResults(queryParam, newSearchTypes)
      } else if (apiStatus.checked) {
        setError("API server is offline. Please try again later.")
      }
    }
  }, [location.search, apiStatus])

  const fetchResults = async (searchQuery, types = searchTypes) => {
    setLoading(true)
    setError(null)

    if (types.papers) setPaperResults([])
    if (types.github) setGithubResults([])

    try {
      const promises = []

      if (types.papers) {
        promises.push(
          processQuery(searchQuery)
            .then((data) => setPaperResults(data))
            .catch((err) => {
              console.error("Error fetching paper results:", err)
              return null
            }),
        )
      }

      if (types.github) {
        promises.push(
          processGithubQuery(searchQuery)
            .then((data) => setGithubResults(data))
            .catch((err) => {
              console.error("Error fetching GitHub results:", err)
              return null
            }),
        )
      }
      await Promise.all(promises)

      if (
        promises.length > 0 &&
        types.papers &&
        paperResults.length === 0 &&
        types.github &&
        githubResults.length === 0
      ) {
        throw new Error("No results found for your query")
      }
    } catch (err) {
      console.error("Error fetching results:", err)
      setError(err.message || "An error occurred while fetching results")
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout simpleFooter={true}>
      <Box
        sx={{
          height: "calc(100vh - 70px)", // Adjust for navbar and footer
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg" sx={{ flexGrow: 1, display: "flex", flexDirection: "column", py: 3}}>
          {!apiStatus.checked && (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
              <CircularProgress size={20} sx={{ color: "#00bcd4", mr: 1 }} />
              <Typography sx={{ color: alpha("#ffffff", 0.7) }}>Checking API connection...</Typography>
            </Box>
          )}

          {apiStatus.checked && !apiStatus.online && (
            <Alert severity="error" sx={{ m: 2, backgroundColor: alpha("#f44336", 0.1), color: "#f44336" }}>
              API server is offline. Please ensure the backend is running at{" "}
              {process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:5000"}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ m: 2, backgroundColor: alpha("#f44336", 0.1), color: "#f44336" }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LoadingAnimation />
            </Box>
          ) : (
            <Box sx={{ height: "100%", marginTop: 8 }}>
              {(paperResults.length > 0 || githubResults.length > 0) && (
                <PaginatedResults paperResults={paperResults} githubResults={githubResults} />
              )}
            </Box>
          )}
        </Container>
      </Box>
    </MainLayout>
  )
}

export default Results
