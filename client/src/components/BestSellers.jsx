import "../app.css";
import { dummyProducts } from "../assets/assets";
import ProductCard from "./ProductCard";

const BestSellers = () => {
  return (
    <div className="categories-container">
      <h2 className="categories-title">Best Sellers</h2>
      <div className="categories-row">
        {dummyProducts.slice(0, 5).map((cat) => (
          <ProductCard product={cat} />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
