import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

function Gallery({ portal, user }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (portal) {
      portal.user
        .fetchItems()
        .then((fetchedItems) => {
          console.log("Fetched Items:", fetchedItems);
          const itemsArray = Array.isArray(fetchedItems) ? fetchedItems : fetchedItems.results || [];
          setItems(itemsArray);
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
          setItems([]); // Ensure we fallback to an empty array
        });
    }
  }, [portal]);

  return (
    <div>
      <h2>Your Items</h2>
      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        <div className="item-gallery">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} portal={portal} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
