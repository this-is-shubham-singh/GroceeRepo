import { useContext } from "react";
import "../App.css";
import ProductCard from "./ProductCard";
import { AppContext } from "../context/AppContextProvider";

const BestSellers = () => {
  const { allProducts } = useContext(AppContext);
  return (
    <div className="categories-container">
      <h2 className="categories-title">Best Sellers</h2>
      <div className="categories-row">
        {allProducts?.slice(0, 5).map((cat) => (
          <ProductCard product={cat} />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
