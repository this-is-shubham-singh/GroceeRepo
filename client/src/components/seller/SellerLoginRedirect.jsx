import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { Navigate } from "react-router-dom";

const SellerLoginRedirect = ({ children }) => {
  const { seller } = useContext(AppContext);

  return seller ? <Navigate to={"/seller/addProducts"} /> : children;
};

export default SellerLoginRedirect;
