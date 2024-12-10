import { useState } from "react";
import TaskItemPopup from './TaskItemPopup.jsx';

const TaskItem = ({ task }) => {
    const [taskPopup, setTaskPopup] = useState(false);
  
    const handlePopup = () => {
      setTaskPopup(!taskPopup);
    };
  
    return (
      <>
          {taskPopup && <TaskItemPopup title={task.title} text={task.text} handlePopup={handlePopup} />}
          <li onClick={(e) => {
            setTaskPopup(true);
            e.stopPropagation();  // Fancy! (Prevents the clickbox associated with the 'day' from appearing)
          }}>{task.title}</li>
      </>
  
    );
}

export default TaskItem