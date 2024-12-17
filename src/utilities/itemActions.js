//* Updates tags for a specific ArcGIS Online item
export function updateTags(portal) { //* portal - The portal object containing authentication credentials

  //* Extract authentication token from portal credentials
    const token = portal.credential.token;
  //* Hard-coded URL for the specific item to update
    const updateUrl = "https://www.arcgis.com/sharing/rest/content/users/kierancaraway/items/d308e1530e8f4ac899f403d230723236/update";

  //* Prompt user to enter new tags with example format
    const newTags = prompt("Enter new tags (comma-separated):", "exampleTag1,exampleTag2");

  //* Exit function if user cancels or provides no input
    if (!newTags) return;
  
  //* Make POST request to update tags
    fetch(updateUrl, {
      method: "POST",
      body: new URLSearchParams({
        token: token,  //* Authentication token
        tags: newTags, //* The new tags to apply
        f: "json",     //* Specify JSON response format
      }),
    })
      .then((response) => response.json()) //* Parse JSON response
      .then((data) => {
        if (data.success) {
          alert("Tags updated successfully!");
        } else {
          alert("Failed to update tags. Error: " + JSON.stringify(data)); //* If update fails, show error details
        }
      })
      .catch((error) => {
        console.error("Error updating tags:", error); //* Log any network or other errors to console
      });
  }
  