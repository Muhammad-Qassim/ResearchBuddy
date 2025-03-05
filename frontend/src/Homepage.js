import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";

function Homepage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message)) 
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Container>
      <Typography variant="h3">ResearchBuddy AI</Typography>
      <Typography variant="body">Backend says what: {message}</Typography>
    </Container>
  );
}

export default Homepage;
