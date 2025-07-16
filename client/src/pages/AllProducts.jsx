import { useContext, useEffect, useState } from "react";
import "../app.css";
import ProductCard from "../components/ProductCard";
import { AppContext } from "../context/AppContextProvider";

const AllProducts = () => {
  const { searchValue, allProducts, loading } = useContext(AppContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (Array.isArray(allProducts) && allProducts.length > 0) {
      setData(allProducts);
    }
  }, [allProducts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const search = searchValue?.toLowerCase();

      // If there's no search input, show all products
      if (!search) {
        setData(allProducts);
        return;
      }

      // you are here it means search value exist
      const filtered = allProducts.filter((val) => {
        const name = val.name?.toLowerCase() || "";
        const category = val.category?.toLowerCase() || "";
        return name.startsWith(search) || category.startsWith(search);
      });

      setData(filtered);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, allProducts]);

  return (
    <div className="categories-container">
      <h2 className="categories-title">ALL PRODUCTS</h2>
      {loading ? (
        "loading..."
      ) : (
        <div className="categories-row">
          {data?.map((cat) => (
            <ProductCard product={cat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
