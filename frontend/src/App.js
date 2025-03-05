import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message)) 
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>ResearchBuddy AI</h1>
      <p>Backend says what: {message}</p>
    </div>
  );
}

export default App;
