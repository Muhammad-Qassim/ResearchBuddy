import { useState } from "react"
import { Grid, Box, Pagination, Typography, alpha } from "@mui/material"
import MetadataCard from "./MetadataCard"
import SummaryCard from "./SummaryCard"

const PaginatedResults = ({ results }) => {
  const [page, setPage] = useState(1)
  const resultsPerPage = 1
  const totalPages = Math.ceil(results.length / resultsPerPage)

  const handlePageChange = (event, value) => {
    setPage(value)
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Get current page results
  const indexOfLastResult = page * resultsPerPage
  const indexOfFirstResult = indexOfLastResult - resultsPerPage
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult)

  return (
    <Box sx={{ width: "100%" }}>
      {/* Pagination at the top */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Box
            sx={{
              backgroundColor: alpha("#1e1e1e", 0.5),
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
              p: 2,
            }}
          >
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
                    backgroundColor: alpha("#00bcd4", 0.2),
                    borderColor: "#00bcd4",
                    color: "#ffffff",
                  },
                  "&:hover": {
                    backgroundColor: alpha("#00bcd4", 0.1),
                  },
                },
              }}
            />
          </Box>
        </Box>
      )}

      {currentResults.map((result, index) => (
        <Grid container spacing={4} key={`result-${index}`} sx={{ mb: 4 }}>
          <Grid item xs={12} md={5}>
            <Box sx={{ height: { md: "700px" }, overflow: "auto" }}>
              <MetadataCard metadata={result.metadata} />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box sx={{ height: { md: "700px" }, overflow: "auto" }}>
              <SummaryCard summary={result.summary || "Summary is being processed..."} />
            </Box>
          </Grid>
        </Grid>
      ))}
    </Box>
  )
}

export default PaginatedResults

