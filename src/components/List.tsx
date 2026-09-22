import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import type { TaskProps, ListProps } from "../types/types";



const List = ({ title, id:parentId, children }: ListProps) => {
  const { tasks, setTasks } = useTasks();

  const [addTaskDescription, setAddTaskDescription] = useState("");

  function handleOnClick() {
    const newTask: TaskProps = {
      description: addTaskDescription,
      id: 1,
      parentId: parentId,
      listPosition: 0,
      isCompleted: false,
      isEditing: false,
      isParent: false,
    };

    return setTasks([...tasks, newTask]);
    /* setAddTaskDescription("") */
  }

  return (
    <div className="border w-fit">
      <h2>{title}</h2>
      <div className="p-2">
        {children}
        <div>
          <input
            placeholder="Write task description"
            onChange={(e) => setAddTaskDescription(e.target.value)}
          />
          <button  onClick={handleOnClick}>Add Task</button>
        </div>
      </div>
    </div>
  );
};

export default List;
