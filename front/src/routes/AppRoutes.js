import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/oauth/Login";
const AppRoutes = () => {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/oauth/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
