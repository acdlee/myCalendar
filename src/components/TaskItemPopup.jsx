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

export default TaskItemPopup