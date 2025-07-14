import { useEffect, useState } from "react";
import "../app.css";
import { dummyProducts } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);

  const { categoryId } = useParams();

  const getCategoryData = () => {
    const arr = dummyProducts.filter((val, ind) => {
      return val.category === categoryId;
    });

    setCategoryData(arr);
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <div className="categories-container">
      <h2 className="categories-title">Best Sellers</h2>
      <div className="categories-row">
        {categoryData.map((cat) => (
          <ProductCard product={cat} />
        ))}
      </div>
    </div>
  );
};

export default Category;
