const API_URL_GRID = "https://api.weather.gov/gridpoints/TOP/";
const API_URL_POINTS = "https://api.weather.gov/points/";

const lat = '39.070';
const long = '-76.546';

const gridX = '39';
const gridY = '76';

const ENDPOINT = '/forecast';

let forecastUrl = '';


fetch("https://api.weather.gov/points/" + lat + ',' + long) // Replace with your API URL
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok - endpoint /points');
    }
    return response.json(); // Assuming the API returns JSON data
  })
  .then(data => {
    forecastUrl = data.properties.forecast;
    console.log(data.properties.forecast);
    fetch(forecastUrl) // Replace with your API URL
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok - endpoint /forecast');
      }
      return response.json(); // Assuming the API returns JSON data
    })
    .then(data => {
      // Process the data
      const periods = data.properties.periods;
      periods.forEach(element => {
        console.log(JSON.stringify(element));
      });
      // console.log(data.properties.forecast);
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });


