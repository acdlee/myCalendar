const TaskItemPopup = ({ id, handleDeleteTask, title, text, handlePopup }) => {
    const handleClose = (e) => {
      e.preventDefault();
      e.stopPropagation();  // Fancy! (Prevents the clickbox associated with the 'day' from appearing)
      handlePopup();
    }

    const handleDelete = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handlePopup();
      handleDeleteTask(id);
    }
  
    return (
      <div className='div-task-item-popup'>
        <button onClick={handleClose}>X</button>
        <button onClick={handleDelete}>Delete</button>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    );
}

export default TaskItemPopup