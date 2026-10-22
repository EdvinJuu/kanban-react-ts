import React, { useState } from "react";
import type { TaskRecursionProps } from "../types/types";
import { EditIcon, CheckIcon } from "./elements/Icons";
import { useCreateTasks } from "../hooks/useCreateTask";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useTheme } from "../context/ThemeContext";
import { cardLevelColor, iconColor } from "../utils/themeUtils";

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

  const { theme } = useTheme();
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

    // caches the old state in previous and create the expected flip in next
    const previous = isCompleted;
    const next = !isCompleted; // This is the expected flip

    // gives the task in saved task state the expected flip
    onTaskChanged(id, { isCompleted: next });

    // Updates the task on server with the expected flip
    const updated = await updateTask(id, { isCompleted: next });

    // If we do not manage to update the task on server use "previous" to revert to old state
    if (!updated) {
      console.log("Could not save, please try again."); // UPDATE THIS WITH BETTER UX, MAYBE USE ERROR FROM DATA BOUNDARY?
      onTaskChanged(id, { isCompleted: previous });
    }
  }

  
  return (
    <li
      className={` py-1 px-2 pl-1 h-fit text-text rounded-xl ${isEditing ? ` border-2 border-black` : ""}`}
      style={{ backgroundColor: cardLevelColor(theme, depth) }}
      onDoubleClick={(e) => handleEditOnClick(e, true)}
    >
      <div className=" flex w-full mb-5">
        <button className="mr-2" onClick={handleToggleCompletedOnClick}>
          <CheckIcon
            color={
              isCompleted
                ? iconColor(theme)
                : theme === "light"
                  ? "#222222"
                  : "#444444"
            }
          />
        </button>
        {isEditing ? (
          <textarea
            className={`bg-primary
            w-40 h-full rounded-lg field-sizing-content resize-none`}
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        ) : (
          <p className="w-40">{editedDescription}</p>
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
          <>
            <p
              className="p-2 text-sm text-gray-300"
              onClick={() => {
                setIsAdding(true);
                setAddTaskDescription("");
              }}
            >
              Add new card ...
            </p>
            <button onClick={(e) => handleDeleteTaskOnClick(e)}>
              Delete Task
            </button>
            {editedDescription !== description ? (
              <button onClick={(e) => handleUpdateTaskOnClick(e)}>
                Update Task
              </button>
            ) : (
              <p>Update Task</p>
            )}
          </>
        ))}
    </li>
  );
};

export default TaskCard;
