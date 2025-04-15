import { useState, useEffect } from "react"
import { Grid, Box, Pagination, Typography, alpha, Tabs, Tab } from "@mui/material"
import MetadataCard from "../research paper/MetadataCard"
import SummaryCard from "../research paper/SummaryCard"
import GitHubRepoCard from "../github/GitHubRepoCard"
import GitHubSummaryCard from "../github/GitHubSummaryCard"
import { MenuBook, GitHub } from "@mui/icons-material"

const PaginatedResults = ({ paperResults = [], githubResults = [] }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [page, setPage] = useState(1)
  const resultsPerPage = 1

  const currentResults = activeTab === 0 ? paperResults : githubResults
  const totalPages = Math.ceil(currentResults.length / resultsPerPage)

  useEffect(() => {
    setPage(1)
  }, [activeTab])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handlePageChange = (event, value) => {
    setPage(value)
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
      {/* Tabs for switching between research papers and GitHub repos */}
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="result type tabs"
          centered
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: activeTab === 0 ? "#00bcd4" : "#6e5494",
            },
            "& .MuiTab-root": {
              color: alpha("#ffffff", 0.7),
              "&.Mui-selected": {
                color: activeTab === 0 ? "#00bcd4" : "#6e5494",
              },
            },
          }}
        >
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
        </Tabs>
      </Box>

      {totalPages > 1 && (
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
                  backgroundColor: alpha(activeTab === 0 ? "#00bcd4" : "#6e5494", 0.2),
                  borderColor: activeTab === 0 ? "#00bcd4" : "#6e5494",
                  color: "#ffffff",
                },
                "&:hover": {
                  backgroundColor: alpha(activeTab === 0 ? "#00bcd4" : "#6e5494", 0.1),
                },
              },
            }}
          />
        </Box>
      )}

      {currentResults.length === 0 && (
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
            No {activeTab === 0 ? "research papers" : "GitHub repositories"} found for this query.
          </Typography>
        </Box>
      )}

      {currentPageResults.length > 0 && (
        <Grid container spacing={3} sx={{ flexGrow: 1, height: "calc(100% - 120px)" }}>
          <Grid item xs={12} md={3} sx={{ height: "100%" }}>
            <Box sx={{ height: "100%" }}>
              {activeTab === 0 ? (
                <MetadataCard metadata={currentPageResults[0].metadata} />
              ) : (
                <GitHubRepoCard repository={currentPageResults[0].repository} />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={9} sx={{ height: "100%" }}>
            <Box sx={{ height: "100%" }}>
              {activeTab === 0 ? (
                <SummaryCard summary={currentPageResults[0].summary || "Summary is being processed..."} />
              ) : (
                <GitHubSummaryCard summary={currentPageResults[0].summary || "Summary is being processed..."} />
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default PaginatedResults
