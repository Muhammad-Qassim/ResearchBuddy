import { useState, useEffect } from "react"
import { AppBar, Toolbar, Typography, Button, Box, IconButton, useMediaQuery, alpha } from "@mui/material"
import { Explore, Menu as MenuIcon } from "@mui/icons-material"
import { Link } from "react-router-dom"
import Hexagon from "../common/Hexagon"
import GradientText from "../common/GradientText"


const Navbar = ({ transparent = false, activeSection = null }) => {
    const [scrolled, setScrolled] = useState(false)
    const isMobile = useMediaQuery("(max-width:900px)")
  
    useEffect(() => {
      if (!transparent) {
        setScrolled(true)
        return
      }
  
      const handleScroll = () => {
        const scrollPosition = window.scrollY
        setScrolled(scrollPosition > 50)
      }
  
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [transparent])
  
    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  
    return (
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          background: scrolled ? "rgba(15, 23, 42, 0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "all 0.3s ease",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: "bold",
                fontFamily: "Courier New",
                letterSpacing: 1,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Research<GradientText>Buddy</GradientText>
            </Typography>
          </Box>
  
          {isMobile ? (
            <IconButton color="inherit" edge="end">
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              {transparent && activeSection && (
                <>
                  {["features", "how-it-works", "get-started"].map((section) => (
                    <Box
                      key={section}
                      onClick={() => scrollToSection(section)}
                      sx={{
                        color: activeSection === section ? "#00bcd4" : "text.primary",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        position: "relative",
                        fontFamily: "Courier New",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        padding: "4px 0",
                        "&:hover": { color: "#00bcd4" },
                        "&:after": {
                          content: '""',
                          position: "absolute",
                          width: activeSection === section ? "100%" : "0%",
                          height: "2px",
                          bottom: 0,
                          left: 0,
                          backgroundColor: "#00bcd4",
                          transition: "width 0.3s ease",
                        },
                        "&:hover:after": {
                          width: "100%",
                        },
                      }}
                    >
                      {section.replace(/-/g, " ")}
                    </Box>
                  ))}
                </>
              )}
              {!transparent && (
                <>
                  <Button
                    component={Link}
                    to="/search"
                    variant="text"
                    sx={{
                      color: "text.primary",
                      textTransform: "none",
                      "&:hover": { color: "#00bcd4" },
                    }}
                  >
                    Search
                  </Button>
                  <Button
                    component={Link}
                    to="/"
                    variant="text"
                    sx={{
                      color: "text.primary",
                      textTransform: "none",
                      "&:hover": { color: "#00bcd4" },
                    }}
                  >
                    Home
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    )
  }
  
  export default Navbar
  
  