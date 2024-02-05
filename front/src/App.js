import "./App.css";
import "./css/fonts.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./scrollToTop.js";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import Main from "./components/main/main.js";
import Portfolio from "./components/portfolio/portfolio.js";
import Contact from "./components/contact/contact.js";
import Admin from "./adminComponents/admin.js";
import AdminLogin from "./adminComponents/adminLogin.js";
function App() {
  const [currentPage, setCurrentPage] = useState();
  const location = useLocation();
  useEffect(() => {
    const page = location.pathname;
    setCurrentPage(page);
  }, [location]);

  return (
    <>
      <Header page={currentPage} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
