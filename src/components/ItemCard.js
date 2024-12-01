import React from 'react';
import IdentityManager from "@arcgis/core/identity/IdentityManager";

function ItemCard({ item, portal }) {
  // Function to handle the tag update action

  function updateTags(itemId, username, portal) {
    // Check if credentials are available and if token is present
    const credentials = IdentityManager.credentials;

    if (!credentials || credentials.length === 0) {
      // If no credentials are found, prompt the user to log in
      alert('You need to log in to update tags.');
      IdentityManager.getCredential(portal.url + '/sharing')
        .then((credential) => {
          // Once logged in, retry updating tags with the new token
          const token = credential.token;
          proceedWithTagUpdate(itemId, username, portal, token);
        })
        .catch((error) => {
          console.error('Login failed:', error);
          alert('Please sign in to continue.');
        });
      return;
    }

    // If credentials are available, get the token from the first credential
    const token = credentials[0].token;

    if (!token) {
      // If token is still not available, prompt the user to log in
      alert('Token is invalid or expired. Please log in again.');
      IdentityManager.getCredential(portal.url + '/sharing')
        .then((credential) => {
          // Retry with the new token
          const newToken = credential.token;
          proceedWithTagUpdate(itemId, username, portal, newToken);
        })
        .catch((error) => {
          console.error('Login failed:', error);
          alert('Please sign in to continue.');
        });
      return;
    }

    // Proceed with the update if token is valid
    proceedWithTagUpdate(itemId, username, portal, token);
  }

  function proceedWithTagUpdate(token) {
    const updateUrl = "https://www.arcgis.com/sharing/rest/content/users/kierancaraway/items/d308e1530e8f4ac899f403d230723236/update";

    // Prompt for new tags
    const newTags = prompt('Enter new tags (comma-separated):', 'exampleTag1,exampleTag2');
    if (!newTags) return;  // If the user cancels or enters nothing, exit

    // Make the API request to update the tags
    fetch(updateUrl, {
      method: 'POST',
      body: new URLSearchParams({
        tags: newTags,
        token: token,  // Use the valid token here
        f: 'json'
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Tags updated successfully!');
        } else {
          alert('Failed to update tags. Error: ' + JSON.stringify(data));
        }
      })
      .catch((error) => {
        console.error('Error updating tags:', error);
        alert('An error occurred while updating tags.');
      });
  }


  return (

      <div style={{ float: 'left', padding: '10px', display: 'inline-block' }}>
        <calcite-card>
          <img slot="thumbnail" src={item.thumbnailUrl} alt={item.title} />
          <span
            slot="title"
            style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          >
            {item.title}
          </span>
          <button className='btn btn-primary' onClick={updateTags}>Update Tags</button>
        </calcite-card>
      </div>
   

  );
}

export default ItemCard;
