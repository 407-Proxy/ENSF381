function OrderItem({ item, onRemoveItem }) {
  return (
    <div>
      <p>
        {item.name} x{item.quantity} — ${item.total.toFixed(2)}
      </p>
      <button className="remove" onClick={() => onRemoveItem(item.id)}>
        Remove Item
      </button>
    </div>
  );
}

export default OrderItem;
