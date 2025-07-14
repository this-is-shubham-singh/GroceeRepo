import { createContext, useEffect, useState } from "react";
import { dummyProducts } from "../assets/assets";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [cartItemsInArray, setCartItemsInArray] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();

  useEffect(() => {
    setSearchValue("")
  }, [location.pathname]);

  const addcartItemToArray = (currentData) => {
    let arr = [];

    for (const key in currentData) {
      const item = dummyProducts.find((val, ind) => {
        return val._id == key;
      });

      let obj = {
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: currentData[key],
        image: item.image[0],
        offerPrice: item.offerPrice,
      };

      arr.push(obj);
    }

    setCartItemsInArray(arr);
  };

  const addToCart = (productId) => {
    setCartItems((currentData) => {
      const updatedData = { ...currentData };

      if (updatedData[productId]) {
        updatedData[productId] += 1;
      } else {
        updatedData[productId] = 1;
      }

      addcartItemToArray(updatedData);

      return updatedData;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((currentData) => {
      let updatedData = { ...currentData };

      if (updatedData[productId]) {
        updatedData[productId] -= 1;
      }

      if (updatedData[productId] == 0) {
        delete updatedData[productId];
      }

      addcartItemToArray(updatedData);

      return updatedData;
    });
  };

  const deleteFromCart = (productId) => {
    setCartItems((currentData) => {
      const updatedData = { ...currentData };

      if (updatedData[productId]) {
        delete updatedData[productId];
      }

      addcartItemToArray(updatedData);

      return updatedData;
    });
  };

  const countCartItems = () => {
    let count = 0;

    for (const key in cartItems) {
      count += cartItems[key];
    }

    return count;
  };

  let value = {
    isLoggedIn,
    setIsLoggedIn,
    showLoginForm,
    setShowLoginForm,
    addToCart,
    countCartItems,
    deleteFromCart,
    removeFromCart,
    cartItemsInArray,
    addcartItemToArray,
    searchValue,
    setSearchValue,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

// obj = {
//   id: 2,
//   id: 4,
//   id: 3,
//   id: 3
// }

// [
//   {id: 2},
//   {id: 4}
//   {id: 6}
//   {id: 1}
// ]
