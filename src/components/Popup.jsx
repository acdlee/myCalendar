import { useState } from "react";

const Popup = ({ day, onPopupSubmit }) => {
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
      <section className="section-popup-add-task">
        <h2>Add task for {day}</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" name="taskTitle" id="input-task-title" value={title} onChange={handleTitle} /><br />
          <label>Description:</label>
          <input type="text" name='taskText' id='input-task-text' value={text} onChange={handleText}/><br />
          <button className="button-style-1" type='submit'>Add</button>
        </form>
      </section>
    );
}

export default Popup