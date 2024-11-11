import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/oauth/Login";
import Index from "../pages/index";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />{" "}
        <Route path="/oauth/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
