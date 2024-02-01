import "./App.css";
import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
// import { LOAD_MY_INFO_REQUEST } from "./reducers/user";
import Header from "./component/header.js";
import ScrollToTop from "./scrollToTop.js";
import Login from "./component/login.js";
import MainComponent from "./component/mainComponent";

function App() {
  return (
    <div className="app_container">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
