function OrderItem({ item, onRemoveItem }) {
  return (
    <div>
      <p>{item.name}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
      <button className="remove" onClick={() => onRemoveItem(item.flavorId)}>
        Remove Item
      </button>
    </div>
  );
}

export default OrderItem;
