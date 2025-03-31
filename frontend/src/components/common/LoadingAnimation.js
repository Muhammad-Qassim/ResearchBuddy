import { Box, Typography } from "@mui/material"
import { Explore } from "@mui/icons-material"
import Hexagon from "./Hexagon"

const LoadingAnimation = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 10,
    }}
  >
    <Box
      sx={{
        position: "relative",
        width: 120,
        height: 120,
        mb: 4,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: "3px solid transparent",
          borderTopColor: "#ffca00",
          animation: "spin 2s linear infinite",
          "@keyframes spin": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          width: "calc(100% - 20px)",
          height: "calc(100% - 20px)",
          borderRadius: "50%",
          border: "3px solid transparent",
          borderTopColor: "#00bcd4",
          animation: "spin 3s linear infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          width: "calc(100% - 40px)",
          height: "calc(100% - 40px)",
          borderRadius: "50%",
          border: "3px solid transparent",
          borderTopColor: "#e91e63",
          animation: "spin 1.5s linear infinite",
        }}
      />

      <Hexagon
        size={40}
        color="#ffca00"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "pulse 1.5s ease-in-out infinite",
          "@keyframes pulse": {
            "0%": { transform: "translate(-50%, -50%) scale(1)" },
            "50%": { transform: "translate(-50%, -50%) scale(1.2)" },
            "100%": { transform: "translate(-50%, -50%) scale(1)" },
          },
        }}
      >
        <Explore sx={{ color: "rgb(15 23 42)" }} />
      </Hexagon>
    </Box>

    <Typography variant="h8" sx={{ color: "#ffffff", mb: 2 }}>
        Processing your research query. This may take a moment...
    </Typography>

  </Box>
)

export default LoadingAnimation

