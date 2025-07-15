import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const SellerProtectedRoute = () => {
  const { seller } = useContext(AppContext);

  return seller ? <Outlet /> : <Navigate to={"/seller/login"} />;
};

export default SellerProtectedRoute;
