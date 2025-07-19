import { useContext, useEffect, useState } from "react";
import "../App.css";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const { allProducts, loading } = useContext(AppContext);

  const { categoryId } = useParams();

  const getCategoryData = () => {
    const arr = allProducts?.filter((val, ind) => {
      return val.category === categoryId;
    });

    setCategoryData(arr);
  };

  useEffect(() => {
    if (!allProducts) {
      return;
    }

    getCategoryData();
  }, [allProducts]);

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
