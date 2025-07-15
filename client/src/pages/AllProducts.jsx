import { cloneElement, useContext, useEffect, useState } from "react";
import "../app.css";
import { dummyProducts } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { AppContext } from "../context/AppContextProvider";

const AllProducts = () => {
  const { searchValue, setSearchValue } = useContext(AppContext);

  const [data, setData] = useState(dummyProducts);
  const [loading, setLoading] = useState(false);

  function searchProduct() {
    let arr = [...dummyProducts];

    if (searchValue) {
      arr = dummyProducts.filter((val, index) => {
        return (
          val.name.toLowerCase().startsWith(searchValue) ||
          val.category.toLowerCase().startsWith(searchValue)
        );
      });
    }

    setData(arr);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      searchProduct();
      setLoading(false);
    }, 1000);

    setLoading(true);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  return (
    <div className="categories-container">
      <h2 className="categories-title">ALL PRODUCTS</h2>
      {loading ? (
        "loading..."
      ) : (
        <div className="categories-row">
          {data.map((cat) => (
            <ProductCard product={cat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
