import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FlavorCatalog from "./FlavorCatalog";
import OrderList from "./OrderList";

function FlavorsPage() {
  const [order, setOrder] = useState([]);

  function parsePrice(priceString) {
    return Number(priceString.replace("$", ""));
  }

  function handleAddToOrder(flavor) {
    const price = parsePrice(flavor.price);

    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((item) => item.id === flavor.id);

      if (existingItem) {
        return prevOrder.map((item) =>
          item.id === flavor.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * price
              }
            : item
        );
      }

      return [
        ...prevOrder,
        {
          id: flavor.id,
          name: flavor.name,
          price,
          quantity: 1,
          total: price
        }
      ];
    });
  }

  function handleRemoveItem(id) {
    setOrder((prevOrder) =>
      prevOrder
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
                total: (item.quantity - 1) * item.price
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  return (
    <div className="flavors-page">
      <Header />
      <div className="content">
        <FlavorCatalog onAddToOrder={handleAddToOrder} />
        <OrderList
          order={order}
          setOrder={setOrder}
          onRemoveItem={handleRemoveItem}
        />
      </div>
      <Footer />
    </div>
  );
}

export default FlavorsPage;