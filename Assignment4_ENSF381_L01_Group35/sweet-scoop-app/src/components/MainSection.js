import { useEffect, useState } from "react";

function getStars(rating) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function MainSection() {
  const [featuredFlavors, setFeaturedFlavors] = useState([]);
  const [featuredReviews, setFeaturedReviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const flavorsRes = await fetch("http://localhost:5001/flavors");
      const flavorsData = await flavorsRes.json();
      if (flavorsData.success) {
        const shuffled = [...flavorsData.flavors].sort(() => Math.random() - 0.5);
        setFeaturedFlavors(shuffled.slice(0, 3));
      }

      const reviewsRes = await fetch("http://localhost:5001/reviews");
      const reviewsData = await reviewsRes.json();
      if (reviewsData.success) {
        setFeaturedReviews(reviewsData.reviews);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="main-section">
      <h2>About Sweet Scoop Ice Cream</h2>
      <p>
        Sweet Scoop Ice Cream is a family-owned business that has been serving
        delicious ice cream since 2020. We pride ourselves on using only the
        freshest ingredients to create our unique flavors. Whether you're in the
        mood for a classic vanilla or something more adventurous like our
        signature Chocolate Explosion, we have something for everyone. Come
        visit us and treat yourself to a sweet scoop today!
      </p>

      <h2>Featured Flavors</h2>
      <div className="flavor-grid">
        {featuredFlavors.map((flavor) => (
          <div className="flavor-card" key={flavor.id}>
            <h3>{flavor.name}</h3>
            <p>{flavor.description}</p>
            <p>Price: {flavor.price}</p>
            <img src={`/${flavor.image}`} alt={flavor.name} />
          </div>
        ))}
      </div>

      <h2>Customer Reviews</h2>
      {featuredReviews.map((item, index) => (
        <div key={index}>
          <h3>{item.customerName}</h3>
          <p>Rating: {getStars(item.rating)}</p>
          <p>{item.review}</p>
        </div>
      ))}
    </div>
  );
}

export default MainSection;
