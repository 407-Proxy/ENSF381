import { useEffect } from "react";
import OrderItem from "./OrderItem";

function OrderList({ order, setOrder, onRemoveItem }) {
  useEffect(() => {
    const saved = localStorage.getItem("order");
    if (saved) {
      setOrder(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  const total = order.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="order-list">
      <h2>Your Order</h2>
      {order.map((item) => (
        <OrderItem key={item.id} item={item} onRemoveItem={onRemoveItem} />
      ))}
      <p>
        <strong>Total: ${total.toFixed(2)}</strong>
      </p>
    </div>
  );
}

export default OrderList;
