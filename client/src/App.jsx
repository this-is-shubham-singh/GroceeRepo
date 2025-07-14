import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { AppContext } from "./context/AppContextProvider";
import Login from "./components/Login";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllProducts from "./pages/AllProducts";
import Category from "./pages/Category";
import { Route, Routes, useLocation } from "react-router-dom";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerHome from "./pages/seller/SellerHome";
import SellerLogin from "./pages/seller/SellerLogin";
import SellerAddProducts from "./components/seller/SellerAddProducts";
import SellerProductsList from "./components/seller/SellerProductsList";
import SellerOrders from "./components/seller/SellerOrders";
import UserLayout from "./components/UserLayout";

const App = () => {
  const { showLoginForm } = useContext(AppContext);
  const location = useLocation();

  console.log(location.pathname);

  return (
    <div>
      {!location.pathname.startsWith("/seller") && <Navbar />}
      {showLoginForm && <Login />}
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:categoryId" element={<Category />} />
          <Route
            path="/products/:categoryId/:productId"
            element={<Product />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/addAddress" element={<AddAddress />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/seller/login" element={<SellerLogin />} />
        </Route>

        {/* seller pages and components  */}
        <Route path="/seller" element={<SellerHome />}>
          <Route path="addProducts" element={<SellerAddProducts />} />
          <Route path="productList" element={<SellerProductsList />} />
          <Route path="orders" element={<SellerOrders />} />
        </Route>
      </Routes>
      {!location.pathname.startsWith("/seller") && <Footer />}
    </div>
  );
};

export default App;
