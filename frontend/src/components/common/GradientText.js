import { Box } from "@mui/material"

const GradientText = ({ children, ...props }) => (
  <Box
    component="span"
    sx={{
      background: "linear-gradient(90deg, #ffca00, #00bcd4, #ffca00)",
      backgroundSize: "200% auto",
      color: "transparent",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      animation: "gradient 8s linear infinite",
      display: "inline-block",
      "@keyframes gradient": {
        "0%": {
          backgroundPosition: "0% center",
        },
        "100%": {
          backgroundPosition: "200% center",
        },
      },
      ...props.sx,
    }}
    {...props}
  >
    {children}
  </Box>
)

export default GradientText

