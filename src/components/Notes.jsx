import { useState } from "react";

const Notes = ({}) => {
    const [textValue, setTextValue] = useState('Write your weekly notes here...');
  
    const handleTextChange = (e) => {
      setTextValue(e.target.value);
    }
  
    return (
      <section>
        <label>Weekly Notes:</label><br />
        <textarea value={textValue} onChange={(e) => handleTextChange(e)} name="notes" id="notes" rows="5" cols="33"></textarea>
      </section>
    );
}

export default Notes