import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import theme from "./theme";
import Homepage from "./components/pages/Homepage";
import Search from "./components/pages/Search";
import Results from "./components/pages/Results";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/results" element={<Results />} />
      </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
};

const domNode = document.getElementById("root");
const root = ReactDOM.createRoot(domNode);
root.render(<App />);