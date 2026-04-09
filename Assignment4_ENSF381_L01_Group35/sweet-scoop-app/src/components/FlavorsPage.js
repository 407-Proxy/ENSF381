import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FlavorCatalog from "./FlavorCatalog";
import OrderList from "./OrderList";

function FlavorsPage() {
  const [flavors, setFlavors] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderMessage, setOrderMessage] = useState("");
  const [orderMessageType, setOrderMessageType] = useState("");

  const userId = parseInt(localStorage.getItem("userId"));

  // Load flavors and cart from backend on mount
  useEffect(() => {
    async function loadData() {
      const flavorsRes = await fetch("http://localhost:5001/flavors");
      const flavorsData = await flavorsRes.json();
      if (flavorsData.success) setFlavors(flavorsData.flavors);

      const cartRes = await fetch(`http://localhost:5001/cart?userId=${userId}`);
      const cartData = await cartRes.json();
      if (cartData.success) setCart(cartData.cart);
    }
    loadData();
  }, [userId]);

  async function handleAddToOrder(flavor) {
    const alreadyInCart = cart.find((i) => i.flavorId === flavor.id);

    if (!alreadyInCart) {
      // Not in cart yet — POST
      const res = await fetch("http://localhost:5001/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, flavorId: flavor.id })
      });
      const data = await res.json();
      if (data.success) setCart(data.cart);
    } else {
      // Already in cart — PUT with quantity + 1
      const res = await fetch("http://localhost:5001/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          flavorId: flavor.id,
          quantity: alreadyInCart.quantity + 1
        })
      });
      const data = await res.json();
      if (data.success) setCart(data.cart);
    }
  }

  async function handleRemoveItem(flavorId) {
    const res = await fetch("http://localhost:5001/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, flavorId })
    });
    const data = await res.json();
    if (data.success) setCart(data.cart);
  }

  async function handlePlaceOrder() {
    const res = await fetch("http://localhost:5001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });
    const data = await res.json();
    if (data.success) {
      setCart([]);
      setOrderMessageType("success");
      setOrderMessage(`Order #${data.orderId} placed successfully!`);
    } else {
      setOrderMessageType("error");
      setOrderMessage(data.message);
    }
  }

  return (
    <div className="flavors-page">
      <Header />
      <div className="content">
        <FlavorCatalog flavors={flavors} onAddToOrder={handleAddToOrder} />
        <OrderList
          cart={cart}
          onRemoveItem={handleRemoveItem}
          onPlaceOrder={handlePlaceOrder}
          orderMessage={orderMessage}
          orderMessageType={orderMessageType}
        />
      </div>
      <Footer />
    </div>
  );
}

export default FlavorsPage;
