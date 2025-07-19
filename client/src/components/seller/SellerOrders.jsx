import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContextProvider";

const SellerOrders = () => {
  const { axios, allProducts } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const getAllUsersOrder = async () => {
    try {
      const { data } = await axios.get("/api/order/getAllUsersOrder");
      setOrders(data.allOrders);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getAllUsersOrder();
  }, []);

  console.log("orders", orders);

  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  // const orders = [
  //   {
  //     id: 1,
  //     items: [{ product: { name: "Nike Air Max 270" }, quantity: 1 }],
  //     address: {
  //       firstName: "John",
  //       lastName: "Doe",
  //       street: "123 Main St",
  //       city: "New York",
  //       state: "NY",
  //       zipcode: "10001",
  //       country: "USA",
  //     },
  //     amount: 320.0,
  //     paymentType: "Credit Card",
  //     orderDate: "10/10/2022",
  //     isPaid: true,
  //   },
  //   {
  //     id: 1,
  //     items: [{ product: { name: "Nike Air Max 270" }, quantity: 1 }],
  //     address: {
  //       firstName: "John",
  //       lastName: "Doe",
  //       street: "123 Main St",
  //       city: "New York",
  //       state: "NY",
  //       zipcode: "10001",
  //       country: "USA",
  //     },
  //     amount: 320.0,
  //     paymentType: "Credit Card",
  //     orderDate: "10/10/2022",
  //     isPaid: true,
  //   },
  //   {
  //     id: 1,
  //     items: [{ product: { name: "Nike Air Max 270" }, quantity: 1 }],
  //     address: {
  //       firstName: "John",
  //       lastName: "Doe",
  //       street: "123 Main St",
  //       city: "New York",
  //       state: "NY",
  //       zipcode: "10001",
  //       country: "USA",
  //     },
  //     amount: 320.0,
  //     paymentType: "Credit Card",
  //     orderDate: "10/10/2022",
  //     isPaid: true,
  //   },
  // ];
  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>
      {orders?.map((order, index) => {
        return (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
          >
            <div className="flex gap-5">
              <img
                className="w-12 h-12 object-cover opacity-60"
                src={boxIcon}
                alt="boxIcon"
              />
              <div>
                {order.items.map((product, index) => {
                  let productDetails = allProducts?.find((value, index) => {
                    return value._id === product.productId;
                  });

                  return (
                    <div key={index} className="flex flex-col justify-center">
                      <p className="font-medium">
                        {productDetails.name}{" "}
                        <span
                          className={`text-indigo-500 ${
                            product.quantity < 2 && "hidden"
                          }`}
                        >
                          x {product.quantity}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-sm">
              <p className="font-medium mb-1">
                {order.addressId.firstName} {order.addressId.lastName}
              </p>
              <p>
                {order.addressId.street}, {order.addressId.city},{" "}
                {order.addressId.state},{order.addressId.zipcode},{" "}
                {order.addressId.country}
              </p>
            </div>

            <p className="font-medium text-base my-auto text-black/70">
              ${order.amount}
            </p>

            <div className="flex flex-col text-sm">
              <p>Method: {order.paymentMethod}</p>
              <p>Date: {order.createdAt}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SellerOrders;
