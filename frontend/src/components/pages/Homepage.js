import { useState, useEffect } from "react"
import MainLayout from "../layout/MainLayout"
import HeroSection from "../home/HeroSection"
import FeaturesSection from "../home/FeatureSection"
import HowItWorksSection from "../home/HowItWorksSection"
import CTASection from "../home/CTASection"


function Homepage() {
  const [activeSection, setActiveSection] = useState("hero")

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const sections = ["hero", "features", "how-it-works", "get-started"]
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && scrollPosition >= element.offsetTop - 200) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <MainLayout transparentHeader={true} activeSection={activeSection}>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </MainLayout>
  )
}

export default Homepage

