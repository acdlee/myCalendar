import TaskItem from './TaskItem.jsx';
import { generateSimpleId } from '../util/util.js';

const Calendar = ({ onShowPopup, weather }) => {
    let weatherDataIter = 0;  // Variable to help iterate through the weather data
  
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

export default Calendar