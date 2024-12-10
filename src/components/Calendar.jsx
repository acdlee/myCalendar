import TaskItem from './TaskItem.jsx';
import { generateSimpleId } from '../util/util.js';

const Calendar = ({ onShowPopup, weather, tasks }) => {
    let weatherDataIter = 0;  // Variable to help iterate through the weather data
  
    return (
      <section className='section-calendar'>
        {tasks.isLoaded && tasks.data.map((item) => {
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

export default Calendar