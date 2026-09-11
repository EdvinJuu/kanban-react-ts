import { useState, type ReactNode } from "react";
import { useTasks } from "../context/TaskContext";
import type { TaskProps } from "../types/types";

interface listProps {
  id: number;
  boardId: number; // fix foreignKey
  title: string;
  totalTasks: number;
  children?: ReactNode;
}

const List = ({ title, id:parentId, children }: listProps) => {
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
    };

    setTasks([...tasks, newTask]);
    /* setAddTaskDescription("") */
  }

  return (
    <div className="border w-fit">
      <h2>{title}</h2>
      <div className="p-2">
        {children}
        <form>
          <input
            placeholder="Write task description"
            onChange={(e) => setAddTaskDescription(e.target.value)}
          />
          <button  onClick={handleOnClick}>Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default List;
