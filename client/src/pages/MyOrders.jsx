import "../App.css";

const orders = [
  {
    orderId: "fasdflakfjlasdjfal",
    payment: "COD",
    totalAmount: 324,
    products: [
      {
        image: "/images/potato.png",
        name: "Potato 500g",
        category: "Vegetables",
        quantity: 1,
        status: "Order Placed",
        date: "23/07/2025",
        amount: 32,
      },
      {
        image: "/images/tomato.png",
        name: "Tomato 500g",
        category: "Vegetables",
        quantity: 2,
        status: "Order Placed",
        date: "23/07/2025",
        amount: 40,
      },
    ],
  },
  // Add more order objects here if needed
];

export default function MyOrders() {
  return (
    <div className="myorders-wrapper">
      <h2 className="myorders-heading">My Orders</h2>

      {orders.map((order, index) => (
        <div key={index} className="order-box">
          <div className="order-info">
            <p><strong>Order ID:</strong> {order.orderId}</p>
            <p><strong>Payment:</strong> {order.payment}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
          </div>

          {order.products.map((product, i) => (
            <div key={i} className="product-row">
              {/* Column 1 */}
              <div className="product-col1">
                <img src={product.image} alt={product.name} />
                <div>
                  <p className="product-name">{product.name}</p>
                  <p className="product-category">{product.category}</p>
                </div>
              </div>

              {/* Column 2 */}
              <div className="product-col2">
                <p><strong>Quantity:</strong> {product.quantity}</p>
                <p><strong>Status:</strong> {product.status}</p>
                <p><strong>Date:</strong> {product.date}</p>
              </div>

              {/* Column 3 */}
              <div className="product-col3">
                <p><strong>Amount:</strong> ₹{product.amount}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
