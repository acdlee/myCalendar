import { useState } from "react";

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
      
      console.log(title, text);
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

export default Popup