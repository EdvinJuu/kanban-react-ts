import React, { useEffect, useRef, useState } from "react";
import type { TaskRecursionProps } from "../types/types";
import {
  EditIcon,
  CheckIcon,
  DeleteIcon,
  PlusIcon,
  SaveIcon,
  DiscardIcon,
} from "./elements/Icons";
import { useCreateTasks } from "../hooks/useCreateTask";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useTheme } from "../context/ThemeContext";
import { cardLevelColor } from "../utils/themeUtils";

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
  isHovered,
  setIsHovered,
}: TaskRecursionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [addTaskDescription, setAddTaskDescription] = useState("");
  const [failedButton, setFailedButton] = useState<"save" | "add" | null>(null);

  const { theme } = useTheme();
  const { createTask } = useCreateTasks();
  const { deleteTask } = useDeleteTask();
  const { updateTask } = useUpdateTask();

  // For navigation: Will let us refocus on these refs while react rerenders
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  // isEditing starts out false so on init all the cards will fight for focus,
  // this will help us keep track if init or not
  const wasEditing = useRef(false);

  // For navigation: useEffect to let us refocus on rerender
  useEffect(() => {
    // if card is editing...
    if (isEditing) {
      // Focus textarea ref
      textareaRef.current?.focus();

      // if wasEditing = true....
    } else if (wasEditing.current) {
      editButtonRef.current?.focus();
    }
    // otherwise(like on init) set wasEditing to card's isEditing state
    wasEditing.current = isEditing;
  }, [isEditing]);

  // useEffect for shake animation timer
  useEffect(() => {
    if (!failedButton) return;
    const timer = setTimeout(() => setFailedButton(null), 400);
    return () => clearTimeout(timer);
  }, [failedButton]);

  const children = taskMap.get(id) ?? null;

  async function handleAddTaskOnClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (addTaskDescription.trim().length <= 0) return setFailedButton("add");

    const created = await createTask(addTaskDescription, id);

    if (created) {
      onTasksAdded(created);
      setAddTaskDescription("");
    } else {
      // trigger fail alert
      setFailedButton("add");
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

  async function handleSaveOnClick(e: React.MouseEvent) {
    e.stopPropagation();

    const trimmed = editedDescription.trim();

    if (!trimmed || trimmed === description) {
      return setFailedButton("save");
    }
    const updated = await updateTask(id, { description: editedDescription });

    if (updated) {
      onTaskUpdated(updated);
      setIsEditing(false);
    } else {
      // trigger fail alert
      setFailedButton("save");
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
      className={` py-1 px-2 pl-1 h-fit text-det rounded-xl ${isEditing ? ` border-2 border-black` : ""}`}
      style={{ backgroundColor: cardLevelColor(theme, depth) }}
      onMouseEnter={() => setIsHovered(id)}
      onClick={(e) => {
        e.stopPropagation();
        setIsHovered(id);
      }}
    >
      {/* This is a "live region", that only interacts with screen readers */}
      <p role="status" className="sr-only">
        {/* It announces to the screen reader when the failedButton triggers */}
        {failedButton === "save" && "Could not save changes."}
        {failedButton === "add" && "Could not add the task."}
      </p>

      <div className="min-w-card-min-expanded flex justify-between items-center w-full my-2">
        <div className="flex">
          <button
            className="mr-2"
            onClick={handleToggleCompletedOnClick}
            type="button"
            aria-pressed={isCompleted}
            aria-label="Task completed"
          >
            <CheckIcon
              depth={depth}
              variableName={isCompleted ? "--positive" : "--inactive"}
            />
          </button>
          {isEditing ? (
            <textarea
              className={`bg-secondary
            w-card-min h-full rounded-lg field-sizing-content resize-none`}
              ref={textareaRef}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              aria-label="Edit description"
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setEditedDescription(description);
                  setIsEditing(false);
                }
              }}
            />
          ) : (
            <p className="w-card-min">{editedDescription}</p>
          )}
        </div>

        {!isEditing ? (
          <button
            className={
              isHovered === id || isEditing ? "opacity-100" : "opacity-0"
            }
            ref={editButtonRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            onFocus={() => setIsHovered(id)}
            aria-label="Edit task"
          >
            <EditIcon depth={depth} variableName="--surface-accent" />
          </button>
        ) : (
          <div>
            <button
              onClick={handleSaveOnClick}
              type="button"
              aria-label="Save changes"
            >
              <span
                className={`inline-block ${failedButton === "save" ? "animate-shake" : ""}`}
              >
                <SaveIcon
                  depth={depth}
                  variableName={
                    failedButton === "save" ? "--warning" : "--surface-accent"
                  }
                />
              </span>
            </button>
            <button
              onClick={() => {
                setEditedDescription(description);
                setIsEditing(false);
              }}
              type="button"
              aria-label="Discard changes"
            >
              <DiscardIcon depth={depth} variableName="--surface-accent" />
            </button>
          </div>
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
              isHovered={isHovered}
              setIsHovered={setIsHovered}
            />
          ))}
        </ul>
      )}
      <div className="flex justify-between">
        {isEditing && depth < maxDepth && (
          <div className="flex justify-between">
            <div className="flex w-fit items-center">
              <button
                type="button"
                onClick={(e) => handleAddTaskOnClick(e)}
                aria-label="Add subtask"
              >
                <span
                  className={`inline-block ${failedButton === "add" ? "animate-shake" : ""}`}
                >
                  <PlusIcon
                    depth={depth}
                    variableName={
                      failedButton === "add" ? "--warning" : "--surface-accent"
                    }
                  />
                </span>
              </button>

              <textarea
                className="m-2 w-card-min border-b border-detail-accent field-sizing-content resize-none"
                onChange={(e) => setAddTaskDescription(e.target.value)}
                placeholder="Create new subtask"
                value={addTaskDescription}
                aria-label="Create new subtask"
              />
            </div>
          </div>
        )}
        {isEditing && (
          <button
            onClick={(e) => handleDeleteTaskOnClick(e)}
            type="button"
            aria-label="Delete task"
          >
            <DeleteIcon
              depth={depth}
              variableName="--warning"
              hueShift={2}
              depthShift={1}
            />
          </button>
        )}
      </div>
    </li>
  );
};

export default TaskCard;
