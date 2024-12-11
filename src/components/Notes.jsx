import { useState } from "react";

const Notes = ({}) => {
    const [textValue, setTextValue] = useState('Write your weekly notes here...');
  
    const handleTextChange = (e) => {
      setTextValue(e.target.value);
    }
  
    return (
      <section id="section-notes">
        <label>Weekly Notes:</label>
        <textarea value={textValue} onChange={(e) => handleTextChange(e)} name="notes" id="notes" rows="10" cols="200"></textarea>
      </section>
    );
}

export default Notes