import { Box } from "@mui/material"
import Navbar from "./Navbar"
import Footer from "./Footer"
import SimpleFooter from "./SimpleFooter"

const MainLayout = ({ children, transparentHeader = false, activeSection = null, simpleFooter = false }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "rgb(15 23 42)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,188,212,0.1) 0%, rgba(0,188,212,0) 70%)",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          left: "10%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,202,0,0.1) 0%, rgba(255,202,0,0) 70%)",
          zIndex: 0,
        }}
      />

      <Navbar transparent={transparentHeader} activeSection={activeSection} />

      <Box component="main" sx={{ flexGrow: 1, position: "relative", zIndex: 1 }}>
        {children}
      </Box>

      {simpleFooter ? <SimpleFooter /> : <Footer />}
    </Box>
  )
}

export default MainLayout

