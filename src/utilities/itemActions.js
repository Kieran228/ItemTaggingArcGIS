export function updateTags(itemId, username, portal) {
    const token = portal.credential.token;
    const updateUrl = "https://www.arcgis.com/sharing/rest/content/users/kierancaraway/items/d308e1530e8f4ac899f403d230723236/update";
  
    const newTags = prompt("Enter new tags (comma-separated):", "exampleTag1,exampleTag2");
    if (!newTags) return;
  
    fetch(updateUrl, {
      method: "POST",
      body: new URLSearchParams({
        tags: newTags,
        token: token,
        f: "json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Tags updated successfully!");
        } else {
          alert("Failed to update tags. Error: " + JSON.stringify(data));
        }
      })
      .catch((error) => {
        console.error("Error updating tags:", error);
      });
  }
  