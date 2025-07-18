import { useContext, useEffect, useState } from "react";
import "../App.css";
import { AppContext } from "../context/AppContextProvider";

// const orders = [
//   {
//     orderId: "fasdflakfjlasdjfal",
//     payment: "COD",
//     totalAmount: 324,
//     products: [
//       {
//         image: "/images/potato.png",
//         name: "Potato 500g",
//         category: "Vegetables",
//         quantity: 1,
//         status: "Order Placed",
//         date: "23/07/2025",
//         amount: 32,
//       },
//       {
//         image: "/images/tomato.png",
//         name: "Tomato 500g",
//         category: "Vegetables",
//         quantity: 2,
//         status: "Order Placed",
//         date: "23/07/2025",
//         amount: 40,
//       },
//     ],
//   },
//   // Add more order objects here if needed
// ];

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { axios, allProducts } = useContext(AppContext);
  const getOrders = async () => {
    try {
      const { data } = await axios.get("order/getAllOrders");
      setOrders(data.allOrders);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // console.log(orders);

  return (
    <div className="myorders-wrapper">
      <h2 className="myorders-heading">My Orders</h2>

      {orders.length === 0 ? (
        <h1 style={{ textAlign: "center", fontSize: "25px" }}>No orders...</h1>
      ) : (
        orders?.map((order, index) => (
          <div
            key={index}
            className="order-box"
            style={{ border: "1px solid gray" }}
          >
            <div className="order-info">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Payment:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{order.amount}
              </p>
            </div>

            {/* get product data from all prouducts  */}

            {order.items.map((product, i) => {
              console.log(product);
              let productDetails = allProducts?.find((value, index) => {
                return value._id === product.productId;
              });
              return (
                <div key={i} className="product-row">
                  {/* Column 1 */}
                  <div className="product-col1">
                    <img src={productDetails.image[0]} alt={product.name} />
                    <div>
                      <p className="product-name">{productDetails.name}</p>
                      <p className="product-category">
                        {productDetails.category}
                      </p>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="product-col2">
                    <p>
                      <strong>Quantity:</strong> {product.quantity}
                    </p>
                    <p>
                      <strong>Status:</strong> {order.status}
                    </p>
                    <p>
                      <strong>Date:</strong> {order.createdAt.slice(0, 10)}
                    </p>
                  </div>

                  {/* Column 3 */}
                  <div className="product-col3">
                    <p>
                      <strong>Amount:</strong> ₹
                      {productDetails.offerPrice * product.quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
}
