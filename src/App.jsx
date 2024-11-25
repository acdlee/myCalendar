import { useState } from 'react'

function generateSimpleId() {
  let id = Math.random().toString(36).substr(2, 9); // Generates a 9-character alphanumeric string
  return id
}

const Header = ({ weekStart, weekEnd }) => {
  return (
    <section>
        <h1>MyCalendar</h1>
        <label>Location: </label>
        <input type="text" />
        <p>Week: {weekStart} - {weekEnd}</p>
        <hr />
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
    <section>
      { data.map((item) => {
        return (
          <div key={ item.day } onClick={() => {onShowPopup(item.day)}} style={{outline: "1px solid black"}}>
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
    <>
      <Header weekStart={first_f} weekEnd={last_f} />
      { showPopup && <Popup day={day} onPopupSubmit={handlePopupSubmit} /> }
      <Calendar onShowPopup={handleShowPopup} />
    </>
  )
}

const data = [
  {
    day: "Sunday",
    tasks: [
      {
        id: generateSimpleId(),
        title: "Go to store",
        text: "Go to store and get grocceries",
      }
    ]
  },
  {
    day: "Monday",
    tasks: [
      {
        id: generateSimpleId(),
        title: "Go to store",
        text: "Go to store and get grocceries",
      }
    ]
  },  {
    day: "Tuesday",
    tasks: [
      {
        id: generateSimpleId(),
        title: "Go to store",
        text: "Go to store and get grocceries",
      }
    ]
  },  {
    day: "Wednesday",
    tasks: [
      {
        id: generateSimpleId(),
        title: "Go to store",
        text: "Go to store and get grocceries",
      }
    ]
  },  {
    day: "Thursday",
    tasks: [
      {
        id: generateSimpleId(),
        title: "Go to store",
        text: "Go to store and get grocceries",
      }
    ]
  },  {
    day: "Friday",
    tasks: [
      {
        id: generateSimpleId(),
        title: "Go to store",
        text: "Go to store and get grocceries",
      }
    ]
  },  {
    day: "Saturday",
    tasks: [
      {
        id: generateSimpleId(),
        title: "Go to store",
        text: "Go to store and get grocceries",
      }
    ]
  },
]

export default App
