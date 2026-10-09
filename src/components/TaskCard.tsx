import { useId, useState } from "react";
import type { Task, TaskRecursionProps } from "../types/types";
import { useTasks } from "../context/TaskContext";
import { EditIcon, CheckIconInactive } from "./elements/Icons";
import clsx from "clsx";

const TaskCard = ({
  description,
  id,
  taskMap,
  depth,
  maxDepth,
}: TaskRecursionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [addTaskDescription, setAddTaskDescription] = useState("");

  const { tasks, setTasks, uniqueId, setUniqueId } = useTasks(); // Remove tasks later when implementing callback and memo. Won't be needed. if needed you are doing something wrong.

  const children = taskMap.get(id) ?? null;

  function handleEditOnClick(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    editingState: boolean,
  ) {
    e.stopPropagation();
    setIsEditing(editingState);
  }

  function handleAddTaskOnClick( // CONSIDER MOVING THIS TO SERVER SIDE, SO ONLY SEND ADD REQUEST?
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.stopPropagation();
    if (addTaskDescription.length <= 0) return;
    const newId = uniqueId + 1; // REPLACE THIS ID SYSTEM WITH SOMETHING THAT WORKS OVER SERVER BETTER
    setUniqueId(newId);

    if (typeof id !== "number") return console.error("the id is not a number");
    const newTask: Task = {
      description: addTaskDescription,
      id: newId, // needs to be made unique
      parentId: id,
      isCompleted: false,
      isEditing: false,
    };
    setTasks([...tasks, newTask]);
    setIsAdding(false);
  }
  /*   const taskCardBaseClass = clsx(
    `py-1 px-4 text-accent rounded-xl min-w-60 h-fit`,
  ); */

  return (
    <li
      className={`${depth % 2 === 0 ? `bg-primary` : `bg-secondary`}
      py-1 px-4 min-w-60 h-fit text-accent rounded-xl ${isEditing && `border border-amber-600`}`}
      onDoubleClick={(e) => handleEditOnClick(e, true)}
    >
      <div className=" flex w-full mb-5">
        {isEditing ? (
          <input
            className={`${depth % 2 === 0 ? `bg-secondary` : `bg-primary`} w-full`}
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        ) : (
          <p>{editedDescription}</p>
        )}
        {isEditing && (
          <button onClick={(e) => handleEditOnClick(e, false)}>
            <EditIcon />
          </button>
        )}
      </div>
      {/*       Task ID: {id}
      {parentId != null && <p>parent ID: {parentId}</p>}
      <p>Depth: {depth}</p> */}
      {children && depth < maxDepth && (
        <ul className="mb-2 flex flex-col gap-3">
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
      {isEditing && depth < maxDepth &&
        (isAdding ? (
          <div className="p-2">
            <input
              onChange={(e) => setAddTaskDescription(e.target.value)}
              type="text"
              placeholder="Enter a description"
            ></input>
            <button onClick={(e) => handleAddTaskOnClick(e)}>Add Task</button>
          </div>
        ) : (
          <p
            className="p-2 text-sm text-gray-300"
            onClick={() => {
              setIsAdding(true);
              setAddTaskDescription("");
            }}
          >
            Add new card ...
          </p>
        ))}
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
