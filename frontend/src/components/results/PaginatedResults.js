import { useState, useEffect } from "react"
import { Grid, Box, Pagination, Typography, alpha, Tabs, Tab } from "@mui/material"
import MetadataCard from "../research paper/MetadataCard"
import SummaryCard from "../research paper/SummaryCard"
import GitHubRepoCard from "../github/GitHubRepoCard"
import GitHubSummaryCard from "../github/GitHubSummaryCard"
import RelatedTopicsCard from "../overview/RelatedTopicsCard"
import WikipediaSummaryCard from "../overview/WikipediaSummaryCard"
import ChatBot from "../buddy/Chatbot"
import { MenuBook, GitHub, Chat, Public } from "@mui/icons-material"
import { getTopicOverview } from "../services/api"

const PaginatedResults = ({ paperResults = [], githubResults = [], originalQuery = "" }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [page, setPage] = useState(1)
  const [overviewData, setOverviewData] = useState(null)
  const [loadingOverview, setLoadingOverview] = useState(false)
  const resultsPerPage = 1

  useEffect(() => {
    if (originalQuery) {
      fetchOverviewData(originalQuery)
    }
  }, [originalQuery])

  const fetchOverviewData = async (query) => {
    setLoadingOverview(true)
    try {
      const data = await getTopicOverview(query)
      setOverviewData(data)
    } catch (error) {
      console.error("Failed to fetch overview data:", error)
    } finally {
      setLoadingOverview(false)
    }
  }

  // Calculate total pages based on active tab
  const getTabResults = () => {
    switch (activeTab) {
      case 0:
        return overviewData ? [overviewData] : []
      case 1:
        return paperResults
      case 2:
        return githubResults
      case 3:
        return [{ id: "chatbot" }]
      default:
        return []
    }
  }

  const currentResults = getTabResults()
  const totalPages = activeTab === 3 ? 1 : Math.ceil(currentResults.length / resultsPerPage)

  useEffect(() => {
    setPage(1)
  }, [activeTab])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const handleTopicClick = (topic) => {
    console.log(`Clicked on topic: ${topic}`)
  }

  const indexOfLastResult = page * resultsPerPage
  const indexOfFirstResult = indexOfLastResult - resultsPerPage
  const currentPageResults = currentResults.slice(indexOfFirstResult, indexOfLastResult)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="result type tabs"
          centered
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor:
                activeTab === 0 ? "#3f51b5" : activeTab === 1 ? "#00bcd4" : activeTab === 2 ? "#6e5494" : "#9c27b0",
            },
            "& .MuiTab-root": {
              color: alpha("#ffffff", 0.7),
              "&.Mui-selected": {
                color:
                  activeTab === 0 ? "#3f51b5" : activeTab === 1 ? "#00bcd4" : activeTab === 2 ? "#6e5494" : "#9c27b0",
              },
            },
          }}
        >
          <Tab
            icon={<Public />}
            label="OVERVIEW"
            iconPosition="start"
            sx={{
              textTransform: "none",
              minHeight: "48px",
              py: 1,
              fontWeight: "bold",
            }}
          />
          <Tab
            icon={<MenuBook />}
            label={`RESEARCH PAPER (${paperResults.length})`}
            iconPosition="start"
            sx={{
              textTransform: "none",
              minHeight: "48px",
              py: 1,
              fontWeight: "bold",
            }}
            disabled={paperResults.length === 0}
          />
          <Tab
            icon={<GitHub />}
            label={`GITHUB (${githubResults.length})`}
            iconPosition="start"
            sx={{
              textTransform: "none",
              minHeight: "48px",
              py: 1,
              fontWeight: "bold",
            }}
            disabled={githubResults.length === 0}
          />
          <Tab
            icon={<Chat />}
            label="BUDDY"
            iconPosition="start"
            sx={{
              textTransform: "none",
              minHeight: "48px",
              py: 1,
              fontWeight: "bold",
            }}
          />
        </Tabs>
      </Box>

      {activeTab !== 3 && totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            size="medium"
            sx={{
              "& .MuiPaginationItem-root": {
                color: alpha("#ffffff", 0.7),
                borderColor: alpha("#ffffff", 0.2),
                "&.Mui-selected": {
                  backgroundColor: alpha(activeTab === 0 ? "#3f51b5" : activeTab === 1 ? "#00bcd4" : "#6e5494", 0.2),
                  borderColor: activeTab === 0 ? "#3f51b5" : activeTab === 1 ? "#00bcd4" : "#6e5494",
                  color: "#ffffff",
                },
                "&:hover": {
                  backgroundColor: alpha(activeTab === 0 ? "#3f51b5" : activeTab === 1 ? "#00bcd4" : "#6e5494", 0.1),
                },
              },
            }}
          />
        </Box>
      )}

      {activeTab === 0 && !loadingOverview && (!overviewData || currentPageResults.length === 0) && (
        <Box
          sx={{
            backgroundColor: alpha("#1e1e1e", 0.5),
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
            p: 4,
            textAlign: "center",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: alpha("#ffffff", 0.7) }}>
            No overview data found for this query.
          </Typography>
        </Box>
      )}

      {activeTab !== 0 && activeTab !== 3 && currentResults.length === 0 && (
        <Box
          sx={{
            backgroundColor: alpha("#1e1e1e", 0.5),
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
            p: 4,
            textAlign: "center",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: alpha("#ffffff", 0.7) }}>
            No {activeTab === 1 ? "research papers" : "GitHub repositories"} found for this query.
          </Typography>
        </Box>
      )}

      {activeTab === 3 && (
        <Box sx={{ flexGrow: 1, height: "calc(100% - 48px)" }}>
          <ChatBot topic={originalQuery || "research"} />
        </Box>
      )}

      {activeTab === 0 && !loadingOverview && overviewData && currentPageResults.length > 0 && (
        <Grid container spacing={3} sx={{ flexGrow: 1, height: "calc(100% - 120px)" }}>
          <Grid item xs={12} md={3} sx={{ height: "100%" }}>
            <Box sx={{ height: "100%" }}>
              <RelatedTopicsCard
                relatedTopics={currentPageResults[0].related_topics || []}
                onTopicClick={handleTopicClick}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={9} sx={{ height: "100%" }}>
            <Box sx={{ height: "100%" }}>
              <WikipediaSummaryCard
                summary={currentPageResults[0].summary || "Summary is being processed..."}
                topic={originalQuery}
              />
            </Box>
          </Grid>
        </Grid>
      )}

      {(activeTab === 1 || activeTab === 2) && currentPageResults.length > 0 && (
        <Grid container spacing={3} sx={{ flexGrow: 1, height: "calc(100% - 120px)" }}>
          <Grid item xs={12} md={3} sx={{ height: "100%" }}>
            <Box sx={{ height: "100%" }}>
              {activeTab === 1 ? (
                <MetadataCard metadata={currentPageResults[0].metadata} />
              ) : (
                <GitHubRepoCard repository={currentPageResults[0].repository} />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={9} sx={{ height: "100%" }}>
            <Box sx={{ height: "100%" }}>
              {activeTab === 1 ? (
                <SummaryCard summary={currentPageResults[0].summary || "No summary available for this paper"} />
              ) : (
                <GitHubSummaryCard summary={currentPageResults[0].summary || "No summary available for this repository."} />
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default PaginatedResults
