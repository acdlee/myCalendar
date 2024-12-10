import { useState } from "react";

const Header = ({ weekStart, weekEnd, onLocationChange }) => {
    const [inputValue, setInputValue] = useState('39,76');
  
    const handleButtonClick = (e) => {
      e.preventDefault();
      onLocationChange(inputValue);
    }
  
    return (
      <section className='section-header'>
        <div className='header-h1-location-container'>
          <h1>MyCalendar</h1>
          <label>Lat Long: </label>
          <input type="text" onChange={(e) => setInputValue(e.target.value)} />
          <span style={{color: "red"}}>&lt;WGS 84 Coordinate&gt;</span>
          <button onClick={(e) => {handleButtonClick(e)}}>Submit</button>
        </div>
        <p>Week: {weekStart} - {weekEnd}</p>
      </section>
    )
}

export default Header
