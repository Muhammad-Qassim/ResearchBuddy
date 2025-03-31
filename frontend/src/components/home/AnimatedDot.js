import { Box } from "@mui/material"

const AnimatedDot = ({ delay = 0, ...props }) => (
  <Box
    sx={{
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "#00bcd4",
      margin: "0 4px",
      animation: "pulse 1.5s infinite ease-in-out",
      animationDelay: `${delay}s`,
      "@keyframes pulse": {
        "0%": { transform: "scale(0.8)", opacity: 0.5 },
        "50%": { transform: "scale(1.2)", opacity: 1 },
        "100%": { transform: "scale(0.8)", opacity: 0.5 },
      },
      ...props.sx,
    }}
    {...props}
  />
)

export default AnimatedDot

