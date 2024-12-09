const API_URL = "https://api.weather.gov/gridpoints/TOP/";

fetch(API_URL + '39,76/forecast') // Replace with your API URL
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Assuming the API returns JSON data
  })
  .then(data => {
    // Process the data
    const periods = data.properties.periods;
    periods.forEach(element => {
        if ((element.name.toLowerCase().indexOf("night") === -1)) {
            // console.log(element);
            console.log(element.name);
        }
    });
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });