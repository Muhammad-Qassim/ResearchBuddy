import { useState, useEffect } from "react"
import { Typography, Box, alpha, Alert, CircularProgress, Container, Paper } from "@mui/material"
import { CloudOff, ErrorOutline } from "@mui/icons-material"
import { useLocation } from "react-router-dom"
import { processQuery, processGithubQuery, testConnection, getTopicOverview } from "../services/api"
import MainLayout from "../layout/MainLayout"
import LoadingAnimation from "../common/LoadingAnimation"
import PaginatedResults from "../results/PaginatedResults"

function Results() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [paperResults, setPaperResults] = useState([])
  const [githubResults, setGithubResults] = useState([])
  const [topicOverview, setTopicOverview] = useState(null)
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
        setError("API server is offline. Please ensure the backend is running.")
      }
    }
  }, [location.search, apiStatus])

  const fetchResults = async (searchQuery, types = searchTypes) => {
    setLoading(true)
    setError(null)

    let localPaperResults = []
    let localGithubResults = []

    try {
      const promises = []

      if (types.papers) {
        promises.push(
          processQuery(searchQuery)
            .then((data) => {
              localPaperResults = data
              setPaperResults(data)
            })
            .catch((err) => {
              console.error("Error fetching paper results:", err)
              return null
            })
        )
      }

      if (types.github) {
        promises.push(
          processGithubQuery(searchQuery)
            .then((data) => {
              localGithubResults = data
              setGithubResults(data)
            })
            .catch((err) => {
              console.error("Error fetching GitHub results:", err)
              return null
            })
        )
      }

      promises.push(
        getTopicOverview(searchQuery)
          .then((overviewData) => {
            setTopicOverview(overviewData)
          })
          .catch((err) => {
            console.error("Error fetching topic overview:", err)
            return null
          })
      )

      await Promise.all(promises)

      if (
        promises.length > 0 &&
        types.papers &&
        localPaperResults.length === 0 &&
        types.github &&
        localGithubResults.length === 0
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

  const renderContent = () => {
    if (!apiStatus.checked) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <LoadingAnimation />
          <Typography variant="h6" sx={{ color: alpha("#ffffff", 0.7), mt: 2 }}>
            Checking API connection...
          </Typography>
        </Box>
      )
    }

    if (!apiStatus.online) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              backgroundColor: alpha("#1e1e1e", 0.5),
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
              maxWidth: "600px",
              textAlign: "center",
            }}
          >
            <CloudOff sx={{ fontSize: 60, color: "#e91e63", mb: 2 }} />
            <Typography variant="h5" sx={{ color: "#ffffff", mb: 2 }}>
              Backend Connection Issue
            </Typography>
            <Typography variant="body1" sx={{ color: alpha("#ffffff", 0.7), mb: 3 }}>
              We couldn't connect to the Research Buddy backend service. Please ensure the backend is running at{" "}
              {process.env.REACT_APP_BACKEND_URL}
            </Typography>
            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.5) }}>
              If you're a developer, check the console for more details.
            </Typography>
          </Paper>
        </Box>
      )
    }
    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <LoadingAnimation />
        </Box>
      )
    }

    if (error) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              backgroundColor: alpha("#1e1e1e", 0.5),
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
              maxWidth: "600px",
              textAlign: "center",
            }}
          >
            <ErrorOutline sx={{ fontSize: 60, color: "#e91e63", mb: 2 }} />
            <Typography variant="h5" sx={{ color: "#ffffff", mb: 2 }}>
              Error
            </Typography>
            <Typography variant="body1" sx={{ color: alpha("#ffffff", 0.7) }}>
              {error}
            </Typography>
          </Paper>
        </Box>
      )
    }

    if (paperResults.length > 0 || githubResults.length > 0) {
      return <PaginatedResults paperResults={paperResults} githubResults={githubResults} originalQuery={query} overview={topicOverview}/>
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography variant="h6" sx={{ color: alpha("#ffffff", 0.7) }}>
          Enter a search query to see results
        </Typography>
      </Box>
    )
  }

  return (
    <MainLayout simpleFooter={true}>
      <Box
        sx={{
          height: "calc(100vh - 70px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg" sx={{ height: "90%", py: 3, marginTop: 8 }}>
          {renderContent()}
        </Container>
      </Box>
    </MainLayout>
  )
}

export default Results
