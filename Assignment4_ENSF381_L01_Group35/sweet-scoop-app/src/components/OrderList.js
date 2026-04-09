import OrderItem from "./OrderItem";

function OrderList({ cart, onRemoveItem, onPlaceOrder, orderMessage, orderMessageType }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="order-list">
      <h2>Your Order</h2>
      {cart.length === 0 ? (
        <p>No items in your order yet.</p>
      ) : (
        <>
          {cart.map((item) => (
            <OrderItem key={item.flavorId} item={item} onRemoveItem={onRemoveItem} />
          ))}
          <p>
            <strong>Total: ${total.toFixed(2)}</strong>
          </p>
          <button onClick={onPlaceOrder}>Place Order</button>
        </>
      )}
      {orderMessage && (
        <div className={orderMessageType}>{orderMessage}</div>
      )}
    </div>
  );
}

export default OrderList;
