// Import necessary dependencies
import React from "react";

// Import ArcGIS Identity Manager for handling authentication
import IdentityManager from "@arcgis/core/identity/IdentityManager";

function ItemCard({ item, portal }) { //* item - The item to display || portal - The portal instance containing authentication and user info

  //* Initiates the tag update process by first ensuring valid authentication
  //* itemId - The ID of the item to update
  //* username - The username of the current user
  //* portal - The portal instance
  function updateTags(itemId, username, portal) {  
    //* Attempt to get authentication credentials for the portal 
    IdentityManager.getCredential(portal.url + "/sharing")
      .then((credential) => {
        const token = credential.token;
        proceedWithTagUpdate(itemId, username, portal, token); //* If successful, proceed with the tag update process
      })
      .catch((error) => {
        console.error("Failed to retrieve token:", error);
        alert("Please log in to update tags.");
      });
  }

  //* Handles the actual tag update process after authentication is confirmed
  function proceedWithTagUpdate(itemId, username, portal, token) {
    //* Construct the URL for the update endpoint
    const updateUrl = `${portal.url}/sharing/rest/content/users/${username}/items/${itemId}/update`;

    //* Show prompt for user to enter new tags
    const newTags = prompt("Enter new tags (comma-separated):", "exampleTag1, exampleTag2");
    //* Exit if user cancels or provides no input
    if (!newTags) return;

    //* Make POST request to update the tags
    fetch(updateUrl, {
      method: "POST",
      body: new URLSearchParams({
        tags: newTags,
        token: token,
        f: "json", //* Specify JSON response format
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //* Show success or failure message based on response
        if (data.success) {
          alert("Tags updated successfully!");
        } else {
          alert("Failed to update tags. Error: " + JSON.stringify(data));
        }
      })
      .catch((error) => {
        console.error("Error updating tags:", error);
        alert("An error occurred while updating tags.");
      });
  }
  //* Render the item card using Calcite components
  return (
    <div style={{  padding: "10px", placeItems: "center" }}>
      <calcite-card>
        {/* Display item thumbnail */}
        <img slot="thumbnail" src={item.thumbnailUrl} alt={item.title} />

        {/* Display item title with text overflow handling */}
        <span
          slot="title"
          style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
        >
          {item.title}
        </span>

        {/* Update tags button */}
        <button
          className="btn btn-primary"
          onClick={() => updateTags(item.id, portal.user.username, portal)} //* The Onclick handler now calls the "updateTags" function with the      necessary arguments (item.id, portal.user.username, and portal) that's being exported from the itemAction utility. 
        >
          Update Tags
        </button>
      </calcite-card>
    </div>
  );
}

export default ItemCard;
