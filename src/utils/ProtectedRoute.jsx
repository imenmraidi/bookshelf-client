import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import Landing from "../pages/Landing";

function ProtectedRoute() {
  const user = useSelector(state => state.auth.user);
  return user ? <Home /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
