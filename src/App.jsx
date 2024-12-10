import { useEffect, useReducer, useState } from 'react';
import Header from './components/Header.jsx';
import Popup from './components/Popup.jsx';
import Calendar from './components/Calendar.jsx';
import Notes from './components/Notes.jsx';

import { 
  generateSimpleId, 
  generateWeekStrings, 
  generateTodayString,
  validateLocation,
  sortDays } from './util/util.js';

import './App.css';

// 40.280,-75.300 - wgs test hatfield
// 39.070,-76.546 - sevena park

const API_URL = "https://api.weather.gov/points/";

const weatherReducer = (state, action) => {
  switch(action.type) {
    case 'WEATHER_FETCH_SUCCESS':
      let tempData = [];

      console.log("Gathering data...");
      
      // Iterate over the payload data
      action.payload.forEach(day => {
        if ((day.name.toLowerCase().indexOf("night") === -1)) {  // Exclude night data
          tempData.push({        // Create a data object for each day
            dayName: day.name,
            forecast: day.detailedForecast,
            icon: day.icon,
          })
        }
      });

      // sort the days
      tempData.sort(sortDays);

      // return the new data
      return {
        data: tempData,
        isLoaded: true,
      };
    case 'WEATHER_FETCH_FAILURE':
      console.log("Failure fetch - weather");
      return {
        ...state
      };
    case 'WEATHER_FETCH_POINTS_FAILURE':
      console.log("Failure fetch - endpoint /points");
      return {
        ...state
      };
    default:
      throw new Error();
  }
}

const App = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [day, setDay] = useState('')
  const [first_f, last_f] = generateWeekStrings();
  const [location, setLocation] = useState('39.070,-76.546');
  const [weather, dispatchWeather] = useReducer(
    weatherReducer,
    {data: [], isLoaded: false}
  );

  useEffect(() => {
    fetch(API_URL + location)
      .then((response) => response.json())
      // find the forecast url
      .then((result) => {
        const forecastUrl = result.properties.forecast;
        fetch(forecastUrl)
          .then((response) => response.json())
          .then((result) => {
            dispatchWeather({
              type: 'WEATHER_FETCH_SUCCESS',
              payload: result.properties.periods,
            })
          })
          .catch(() => {
            dispatchWeather({
              type: 'WEATHER_FETCH_FAILURE',
            })
          })
      })
      .catch(() => {
        dispatchWeather({
          type: 'WEATHER_FETCH_POINTS_FAILURE',
        })
      })
  }, [location])

  const handleLocation = (locationString) => {
    console.log(locationString);
    if (validateLocation(locationString)) {
      setLocation(locationString);
    }
  }

  const handleShowPopup = (day) => {
    setDay(day)
    setShowPopup(true)
  }

  const handlePopupSubmit = ( title, text ) => {
    // Add form input to 'data'
    if (title !== '' && text !== '') {
      let dayIndex = days.indexOf(day); // Get day index - 0 Sunday, 6 Saturday
      const newTask = {                 // Create new task
        id: generateSimpleId(),
        title: title,
        text: text,
      };

      console.log(JSON.stringify(newTask));

      // Add task
      data[dayIndex].tasks.push(newTask);
    }

    // Reset relevant states
    setDay('');
    setShowPopup(false);
  }

  return (
    <section className='main'>
      <Header weekStart={first_f} weekEnd={last_f} onLocationChange={handleLocation} />
      { showPopup && <Popup day={day} onPopupSubmit={handlePopupSubmit} /> }
      <Calendar onShowPopup={handleShowPopup} weather={weather} />
      <Notes />
    </section>
  )
}

const data = [
  {
    day: "Sunday",
    tasks: [
      {
        id: generateSimpleId(),
        title: "Go to pet store",
        text: "Get pet supplies.",
      }
    ]
  },
  {
    day: "Monday",
    tasks: [
      {
        id: generateSimpleId(),
        title: "Go to movies",
        text: "Go see a cool movie.",
      }
    ]
  },  {
    day: "Tuesday",
    tasks: [
      {
        id: generateSimpleId(),
        title: "Go to lunch",
        text: "Go have lunch with a friend.",
      }
    ]
  },  {
    day: "Wednesday",
    tasks: [
      {
        id: generateSimpleId(),
        title: "Sleep in",
        text: "Make sure to sleep in this day.",
      }
    ]
  },  {
    day: "Thursday",
    tasks: [
      {
        id: generateSimpleId(),
        title: "Repair car",
        text: "Go to car repair shop.",
      }
    ]
  },  {
    day: "Friday",
    tasks: [
      {
        id: generateSimpleId(),
        title: "Pay bills",
        text: "Make sure you pay bills today.",
      }
    ]
  },  {
    day: "Saturday",
    tasks: [
      {
        id: generateSimpleId(),
        title: "Day off",
        text: "Today is your day off.",
      }
    ]
  },
]

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default App
