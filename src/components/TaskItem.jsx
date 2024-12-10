import { useState } from "react";
import TaskItemPopup from './TaskItemPopup.jsx';

const TaskItem = ({ onDeleteTask, day, task}) => {
    const [taskPopup, setTaskPopup] = useState(false);
  
    const handlePopup = () => {
      setTaskPopup(!taskPopup);
    };

    const handleDeleteTask = (id) => {
      onDeleteTask(id, day);
    };
  
    return (
      <>
          {taskPopup && <TaskItemPopup id={task.id} handleDeleteTask={handleDeleteTask} title={task.title} text={task.text} handlePopup={handlePopup} />}
          <li onClick={(e) => {
            setTaskPopup(true);
            e.stopPropagation();  // Fancy! (Prevents the clickbox associated with the 'day' from appearing)
          }}>{task.title}</li>
      </>
  
    );
}

export default TaskItem