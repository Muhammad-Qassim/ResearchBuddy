import { Box } from "@mui/material"

const Hexagon = ({ children, size = 80, color = "#ffca00", ...props }) => (
  <Box
    sx={{
      position: "relative",
      width: size,
      height: size * 0.866,
      margin: `${size * 0.433}px 0`,
      backgroundColor: color,
      "&:before, &:after": {
        content: '""',
        position: "absolute",
        width: 0,
        height: 0,
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
      },
      "&:before": {
        bottom: "100%",
        borderBottom: `${size * 0.433}px solid ${color}`,
      },
      "&:after": {
        top: "100%",
        borderTop: `${size * 0.433}px solid ${color}`,
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...props.sx,
    }}
    {...props}
  >
    {children}
  </Box>
)

export default Hexagon

