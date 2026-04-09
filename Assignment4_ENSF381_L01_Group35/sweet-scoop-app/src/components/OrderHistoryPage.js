import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch(`http://localhost:5001/orders?userId=${userId}`);
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    }
    fetchOrders();
  }, [userId]);

  return (
    <div>
      <Header />
      <div className="main-section">
        <h2>Order History</h2>
        {orders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              className="flavor-card"
              key={order.orderId}
              style={{ width: "400px", marginBottom: "20px" }}
            >
              <p>
                <strong>Order #{order.orderId}</strong>
              </p>
              <p>{order.timestamp}</p>
              {order.items.map((item, i) => (
                <p key={i}>
                  {item.name} x {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              ))}
              <p>
                <strong>Total: ${order.total.toFixed(2)}</strong>
              </p>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default OrderHistoryPage;
