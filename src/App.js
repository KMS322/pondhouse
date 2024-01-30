import "./App.css";
import "./css/fonts.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./scrollToTop.js";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import Main from "./components/main/main.js";
import Portfolio from "./components/portfolio/portfolio.js";
function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
