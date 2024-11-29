import React from "react";
import { updateTags } from "../utilities/itemActions";

function ItemCard({ item, portal }) {
  const handleUpdateTags = () => {
    updateTags(item.id, portal.user.username, portal);
  };

  return (
    <div className="item-card">
      <img src={item.thumbnailUrl} alt={`${item.title} thumbnail`} />
      <h3>{item.title}</h3>
      <button onClick={handleUpdateTags}>Update Tags</button>
    </div>
  );
}

export default ItemCard;
