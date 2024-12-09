import { useEffect, useReducer, useState } from 'react'
import './App.css'

const API_URL = "https://api.weather.gov/gridpoints/TOP/";
const API_ENDPOINT = "/forecast";

// Helper function to generate unique task ids
function generateSimpleId() {
  let id = Math.random().toString(36).substr(2, 9); // Generates a 9-character alphanumeric string
  return id
}

// Helper function to generate week strings based off current
function generateWeekStrings() {
  const curr = new Date;
  const month = curr.getMonth() + 1;
  const year = curr.getFullYear();
  const first = curr.getDate() - curr.getDay();
  const last = first + 6;

  const first_f = month + '/' + first + '/' + year;
  const last_f = month + '/' + last + '/' + year;

  return [first_f, last_f];
}

// Helper function to get the name of the current day
function generateTodayString() {
  const d = new Date();
  return days[d.getDay()];
}

// Helper function defining a custom sort based off day names
function sortDays(dayA, dayB) {
  let a = '', b = '';

  // Edge case: generate day name for string not found in 'days'
  (!days.includes(dayA.dayName)) ? a = days.indexOf(generateTodayString()) : a = days.indexOf(dayA.dayName);
  (!days.includes(dayB.dayName)) ? b = days.indexOf(generateTodayString()) : b = days.indexOf(dayB.dayName);

  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

const weatherReducer = (state, action) => {
  switch(action.type) {
    case 'WEATHER_FETCH_SUCCESS':
      let tempData = [];

      // console.log(JSON.stringify(action.payload));
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

      // console.log(JSON.stringify(tempData));

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
    default:
      throw new Error();
  }
}

const App = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [day, setDay] = useState('')
  const [first_f, last_f] = generateWeekStrings();
  const [location, setLocation] = useState('39,76');
  const [weather, dispatchWeather] = useReducer(
    weatherReducer,
    {data: [], isLoaded: false}
  );

  useEffect(() => {
    fetch(API_URL + location + API_ENDPOINT)
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
  }, [location])

  const handleLocation = (locationString) => {
    console.log('hit');
    if (locationString.length >= 5) {
      const values = locationString.split(' ');
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

const Header = ({ weekStart, weekEnd, onLocationChange }) => {
  return (
    <section className='section-header'>
      <div className='header-h1-location-container'>
        <h1>MyCalendar</h1>
        <label>Lat Long: </label>
        <input type="text" onChange={(e) => onLocationChange(e.target.value)} />
        <span style={{color: "red"}}>&lt;Lat Long&gt;</span>
      </div>
      <p>Week: {weekStart} - {weekEnd}</p>
    </section>
  )
}

const Popup = ({ day, onPopupSubmit }) => {
  // const styled = {position: 'absolute', top: '50%', left: '50%', backgroundColor: 'gold' };
  const styled = {position: 'absolute', top: '40%', left: '40%', backgroundColor: 'gold' };
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onPopupSubmit(title, text);
  };

  return (
    <section style={styled}>
      <h2>Add task for {day}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" name="taskTitle" id="input-task-title" value={title} onChange={handleTitle} />
        <label>Description</label>
        <input type="text" name='taskText' id='input-task-text' value={text} onChange={handleText}/>
        <button type='submit'>Add</button>
      </form>
    </section>
  );
}

const TaskItemPopup = ({ title, text, handlePopup }) => {
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();  // Fancy! (Prevents the clickbox associated with the 'day' from appearing)
    handlePopup();
  }

  return (
    <div className='div-task-item-popup'>
      <button onClick={handleClose}>X</button>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

const TaskItem = ({ task }) => {
  const [taskPopup, setTaskPopup] = useState(false);

  const handlePopup = () => {
    setTaskPopup(!taskPopup);
  };

  return (
    <>
        {taskPopup && <TaskItemPopup title={task.title} text={task.text} handlePopup={handlePopup} />}
        <li onClick={(e) => {
          setTaskPopup(true);
          e.stopPropagation();  // Fancy! (Prevents the clickbox associated with the 'day' from appearing)
        }}>{task.title}</li>
    </>

  );
}

const Calendar = ({ onShowPopup, weather }) => {
  let weatherDataIter = 0;  // Variable to help iterate through the weather data
  
  // console.log(JSON.stringify(weather));
  // if (weather.isLoaded) {
  //   for (let i  = 0; i < 7; i++) {
  //     console.log(`${i} ${weather.data[i].icon}`);
  //   }
  // }


  return (
    <section className='section-calendar'>
      { data.map((item) => {
        return (
          <div key={ item.day } onClick={() => {onShowPopup(item.day)}}>
            <h3>
              { item.day }
              {weather.isLoaded && <img src={weather.data[weatherDataIter].icon} alt="Weather icon" />}
            </h3>
            <ul>
              { item.tasks.map((task) => {
                return <TaskItem key={task.id} task={task} />
              })}
            </ul>
            {weather.isLoaded && <p>{weather.data[weatherDataIter++].forecast}</p>}
          </div>
        )
      })}
    </section>
  )
}

const Notes = ({}) => {
  return (
    <section>
      <label>Weekly Notes:</label><br />
      <textarea name="notes" id="notes" rows="5" cols="33">Write your weekly notes here...</textarea>
    </section>
  );
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
