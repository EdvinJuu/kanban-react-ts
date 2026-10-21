import React, { useState } from "react";
import type { Task, TaskRecursionProps } from "../types/types";
import { EditIcon, CheckIconInactive, CheckIconActive } from "./elements/Icons";
import { useCreateTasks } from "../hooks/useCreateTask";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useUpdateTask } from "../hooks/useUpdateTask";

const TaskCard = ({
  description,
  id,
  taskMap,
  depth,
  maxDepth,
  isCompleted,
  onTasksAdded,
  onTaskDeleted,
  onTaskUpdated,
  onTaskChanged,
}: TaskRecursionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [addTaskDescription, setAddTaskDescription] = useState("");

  const { createTask } = useCreateTasks();
  const { deleteTask } = useDeleteTask();
  const { updateTask } = useUpdateTask();

  const children = taskMap.get(id) ?? null;

  function handleEditOnClick(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    editingState: boolean,
  ) {
    e.stopPropagation();
    setIsEditing(editingState);
  }

  async function handleAddTaskOnClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (addTaskDescription.trim().length <= 0)
      return console.error("You need to add a description");

    const created = await createTask(addTaskDescription, id);

    if (created) {
      onTasksAdded(created);
      setAddTaskDescription("");
      setIsAdding(false);
    }
  }

  async function handleDeleteTaskOnClick(e: React.MouseEvent) {
    e.stopPropagation();

    // if children(or empty list) is above 0 return true. adding the conditional check(... > 0) makes it boolean
    const hasChildren = (children ?? []).length > 0;

    // if it has children and we confirm through the popup continue, otherwise end function early.
    if (
      hasChildren &&
      !window.confirm("This will delete all the tasks inside it. Continue?")
    ) {
      return;
    }

    const deletedIds = await deleteTask(id);

    // if deletedIds happened update content in Home component.
    if (deletedIds) {
      console.log(deletedIds);
      onTaskDeleted(deletedIds);
    }
  }

  async function handleUpdateTaskOnClick(e: React.MouseEvent) {
    e.stopPropagation();

    const trimmed = editedDescription.trim();

    if (!trimmed || trimmed === description) {
      setEditedDescription(description);
      setIsEditing(false);
      return;
    }
    const updated = await updateTask(id, { description: editedDescription });

    if (updated) {
      onTaskUpdated(updated);
      setIsEditing(false);
    }
  }

  async function handleToggleCompletedOnClick(e: React.MouseEvent) {
    e.stopPropagation();

    // cache the old state in previous and create the expected flip in next
    const previous = isCompleted;
    const next = !isCompleted; // This is the expected flip

    // give the task in saved task state the expected flip
    onTaskChanged(id, { isCompleted: next });

    // Update the task on server with the expected flip
    const updated = await updateTask(id, { isCompleted: next });

    // If we do not manage to update the task on server use "previous" to revert to old state
    if (!updated) {
      console.log("Could not save, please try again.") // UPDATE THIS WITH BETTER UX, MAYBE USE ERROR FROM DATA BOUNDARY?
      onTaskChanged(id, { isCompleted: previous });
    }
  }

  return (
    <li
      className={`${depth % 2 === 0 ? `bg-primary` : `bg-secondary`}
      py-1 px-4 min-w-60 h-fit text-accent rounded-xl ${isEditing ? `border border-amber-600` : ""}`}
      onDoubleClick={(e) => handleEditOnClick(e, true)}
    >
      <div className=" flex w-full mb-5">
        <button onClick={handleToggleCompletedOnClick}>
          {isCompleted ? <CheckIconActive /> : <CheckIconInactive />}
        </button>
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

      {children && depth < maxDepth && (
        <ul className="mb-2 flex flex-col gap-3">
          {children.map((child) => (
            <TaskCard
              description={child.description}
              isEditing={false}
              isCompleted={child.isCompleted}
              key={child.id}
              id={child.id}
              parentId={child.parentId}
              taskMap={taskMap}
              depth={depth + 1}
              maxDepth={maxDepth}
              onTasksAdded={onTasksAdded}
              onTaskDeleted={onTaskDeleted}
              onTaskUpdated={onTaskUpdated}
              onTaskChanged={onTaskChanged}
            />
          ))}
        </ul>
      )}
      {isEditing &&
        depth < maxDepth &&
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
      <button onClick={(e) => handleDeleteTaskOnClick(e)}>Delete Task</button>
      <button onClick={(e) => handleUpdateTaskOnClick(e)}>Update Task</button>
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
