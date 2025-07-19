import { createContext, useEffect, useState } from "react";
import { dummyProducts } from "../assets/assets";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// set global base url for axios
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [cartItemsInArray, setCartItemsInArray] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const [seller, setSeller] = useState(false);
  const [allProducts, setAllProducts] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchValue("");
  }, [location.pathname]);

  // keep authenticating user
  const authenticateUser = async () => {
    try {
      const { data } = await axios.get("/api/user/userAuth");
      setUser(data.userData);
    } catch (e) {
      console.log(e.message);
    }
  };

  const authenticateSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/sellerAuth");
      setSeller(data.success);
    } catch (e) {
      console.log(e.message);
    }
  };

  const addcartItemToArray = (currentData) => {
    let arr = [];

    for (const key in currentData) {
      const item = allProducts.find((val, ind) => {
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

  const calculateTotalAmount = () => {
    let totalAmount = 0;

    cartItemsInArray.forEach((element) => {
      let perItemAmount = element.offerPrice * element.quantity;
      totalAmount += perItemAmount;
    });

    return totalAmount;
  };

  const fetchAllProductsFromDb = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/product/getAllProducts");

      // console.log(data.productData);
      let arr = [...dummyProducts, ...data.productData];

      setAllProducts(arr);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  // api call to update cart to database
  const updateCartItemsToDb = async () => {
    if (user) {
      try {
        const { data } = await axios.post("/api/user/addToCart", { cartItems });

        if (data.success == false) {
          toast.error(data.message);
          return;
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  // get all cart items from database
  const getCartItemsFromDb = async () => {
    if (user) {
      try {
        const { data } = await axios.get("/api/user/getAllCartItems");

        if (data.success == false) {
          toast.error(data.message);
          return;
        }

        setCartItems(data.cartData);
        addcartItemToArray(data.cartData);
      } catch (e) {
        console.log(e.message);
      }
    }
  };


  useEffect(() => {
    getCartItemsFromDb();
  }, [user]);

  useEffect(() => {
    updateCartItemsToDb();
  }, [cartItems]);

  useEffect(() => {
    authenticateUser();
    authenticateSeller();
    fetchAllProductsFromDb();
  }, []);

  let value = {
    user,
    setUser,
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
    axios,
    seller,
    setSeller,
    allProducts,
    setAllProducts,
    loading,
    setLoading,
    calculateTotalAmount,
    cartItems,
    setCartItems,
    setCartItemsInArray
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
