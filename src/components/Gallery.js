import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import PortalQueryParams from '@arcgis/core/portal/PortalQueryParams';

function Gallery({ portal }) {
  const [items, setItems] = useState([]);

  //* Fetch items when the portal is available
  useEffect(() => {
    if (portal) {
      queryItems(portal);  //* Call queryItems instead of fetchItems
    }
  }, [portal]); //* Re-run when `portal` is available

  //* Use queryItems to fetch items based on query params
  function queryItems(portal) {
    const queryParams = new PortalQueryParams({
      query: "owner:" + portal.user.username,
      sortField: "num-views",  //* Sorting by num-views
      sortOrder: "desc",  //* Sort in descending order
      num: 20,  //* Get a maximum of 20 items
    });

    portal.queryItems(queryParams).then((result) => {
      console.log('Fetched Items:', result);
      setItems(result.results || []);  //* Update state with the fetched items
    }).catch((error) => {
      console.error('Error fetching items:', error);
      setItems([]);  //* Handle errors and set to empty array
    });
  }

  return (
    <div>
      <h2>Here are Your Items</h2>
      {items.length === 0 ? (
        <p>No items found</p>  //* Handle the case when no items are returned
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
