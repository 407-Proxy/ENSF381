import FlavorItem from "./FlavorItem";

function FlavorCatalog({ flavors, onAddToOrder }) {
  return (
    <div>
      <h2>Ice Cream Flavors</h2>
      <div className="flavor-grid">
        {flavors.map((flavor) => (
          <FlavorItem
            key={flavor.id}
            flavor={flavor}
            onAddToOrder={onAddToOrder}
          />
        ))}
      </div>
    </div>
  );
}

export default FlavorCatalog;
