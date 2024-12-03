import { useState } from 'react'
import './App.css'

function generateSimpleId() {
  let id = Math.random().toString(36).substr(2, 9); // Generates a 9-character alphanumeric string
  return id
}

const Header = ({ weekStart, weekEnd }) => {
  return (
    <section className='section-header'>
      <div className='header-h1-location-container'>
        <h1>MyCalendar</h1>
        <label>Location: </label>
        <input type="text" />
      </div>
      <p>Week: {weekStart} - {weekEnd}</p>
    </section>
  )
}

const Popup = ({ day, onPopupSubmit }) => {
  return (
    <section style={{position: 'absolute', top: '50%', left: '50%', backgroundColor: 'gold' }}>
      <h2>Add task for {day}</h2>
      <label>Title</label>
      <input type="text" name="taskTitle" id="input-task-title" />
      <label>Description</label>
      <input type="text" name='taskText' id='input-task-text'/>
      <button onClick={() => onPopupSubmit()}>Add</button>
    </section>
  )
}

const Calendar = ({ onShowPopup }) => {
  return (
    <section className='section-calendar'>
      { data.map((item) => {
        return (
          <div key={ item.day } onClick={() => {onShowPopup(item.day)}}>
            <h3>{ item.day }</h3>
            <ul>
              { item.tasks.map((task) => {
                return <li key={task.id}>{task.title}</li>
              })}
            </ul>
          </div>
        )
      })}
    </section>
  )
}

const App = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [day, setDay] = useState('')

  const curr = new Date
  const month = curr.getMonth() + 1
  const year = curr.getFullYear()
  const first = curr.getDate() - curr.getDay()
  const last = first + 6

  const first_f = month + '/' + first + '/' + year
  const last_f = month + '/' + last + '/' + year

  const handleShowPopup = (day) => {
    setDay(day)
    setShowPopup(true)
  }

  const handlePopupSubmit = () => {
    console.log('Submitted!')
    setDay('')
    setShowPopup(false)
  }

  return (
    <section className='main'>
      <Header weekStart={first_f} weekEnd={last_f} />
      { showPopup && <Popup day={day} onPopupSubmit={handlePopupSubmit} /> }
      <Calendar onShowPopup={handleShowPopup} />
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

export default App
