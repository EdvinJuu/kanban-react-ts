import { useState } from "react";
import type { Task, TaskRecursionProps } from "../types/types";
import { useTasks } from "../context/TaskContext";
import Icon from "./Icon";

const TaskCard = ({
  description,
  id,
  taskMap,
  parentId,
  depth,
  maxDepth,
}: TaskRecursionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [addTaskDescription, setAddTaskDescription] = useState("");

  const children = taskMap.get(id) ?? null;

  function handleEditOnClick() {
    setIsEditing(!isEditing);
  }

  /*   function handleAddTaskOnClick() {
    const newTask: TaskRecursionProps = {
      description: addTaskDescription,
      id: 0, // needs to be made unique
      parentId: id,
      isCompleted: false,
      isEditing: false,
    };
    setTasks([...tasks, newTask]);
  } */

  return (
    <li className={`border w-fit p-1`}>
      <div className="border flex w-fit">
        {isEditing ? (
          <input
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        ) : (
          <p>{editedDescription}</p>
        )}
        <button onClick={handleEditOnClick}>
          <Icon
            id="editIcon"
            className=""
            
            width="20px"
            height="20px"
            viewBox="0 0 20 20"
          />
        </button>
      </div>
      {id}: Task ID
      {parentId != null && <p>parent ID: {parentId}</p>}
      <p>Depth: {depth}</p>
      {children && depth < maxDepth && (
        <ul>
          {children.map((child) => (
            <TaskCard
              description={child.description} // HOOK THIS UP
              isEditing={false} // HOOK THIS UP
              isCompleted={false} // HOOK THIS UP
              key={child.id}
              id={child.id}
              parentId={child.parentId}
              taskMap={taskMap}
              depth={depth + 1}
              maxDepth={maxDepth}
            />
          ))}
        </ul>
      )}
    </li>

    /*       {isParent && <div>
        <input
          placeholder="Write task description"
          onChange={(e) => setAddTaskDescription(e.target.value)}
        />
        <button onClick={handleAddTaskOnClick}>Add Task</button>
      </div>} */
  );
};

export default TaskCard;
