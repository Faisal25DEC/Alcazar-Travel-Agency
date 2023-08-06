const url = "http://localhost:3000/touristDestinations"; // Replace this with your actual API endpoint URL
const headers = {
  "Content-Type": "application/json",
};

async function updateTouristDestination(id, data) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log(`Successfully updated tourist destination with ID: ${id}`);
    } else {
      console.log(
        `Failed to update tourist destination with ID: ${id}. Status code: ${response.status}`
      );
    }
  } catch (error) {
    console.error(
      `Error occurred while updating tourist destination with ID: ${id}`,
      error
    );
  }
}

async function updateAllTouristDestinations() {
  const res = await fetch("http://localhost:3000/touristDestinations"); // Assuming you have the data in a db.json file
  const dbJson = await res.json();
  for (const destination of dbJson) {
    // Assuming each destination has an 'id' property to uniquely identify it
    const destinationId = destination.id;
    // Create the updatedData object for each destination
    // Modify the destination object as needed to create the updatedData
    let price = Math.random() * 1000;
    price = price.toFixed(1);
    let ratings = Math.random() * 5;
    if (ratings < 2) ratings++;
    ratings = ratings.toFixed(1);
    let recommended = Math.floor(Math.random() * 3);
    recommended = recommended == 1 ? true : false;
    let trending = Math.floor(Math.random() * 3);
    trending = trending == 1 ? true : false;

    const updatedData = {
      ...destination,
      price: price,
      ratings: ratings,
      recommended: recommended,
      trending: trending /* Your updates here */,
    };

    await updateTouristDestination(destinationId, updatedData);
  }
}

updateAllTouristDestinations();
