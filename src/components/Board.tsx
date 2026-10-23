import type { BoardProps, Task } from "../types/types";
import TaskCard from "../components/TaskCard";
import { useState, useId, useEffect } from "react";
import { useCreateTasks } from "../hooks/useCreateTask";
import { PlusIcon } from "./elements/Icons";

const Board = ({
  tasks,
  onTasksAdded,
  onTaskDeleted,
  onTaskUpdated,
  onTaskChanged,
}: BoardProps) => {
  const [addTaskDescription, setAddTaskDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [failedButton, setFailedButton] = useState<"save" | "add" | null>(null);

  // go through each item in the list. add item with map.get to a list where the parentId matches
  // if it doens't match, create a new list(?? []). Then update the list with the parentId key to include the item.
  // for an initial value create new Map object

  const { createTask } = useCreateTasks();

  // useEffect for shake animation timer
  useEffect(() => {
    if (!failedButton) return;
    const timer = setTimeout(() => setFailedButton(null), 400);
    return () => clearTimeout(timer);
  }, [failedButton]);

  async function handleAddTaskOnClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (addTaskDescription.trim().length <= 0) return setFailedButton("add");

    const created = await createTask(addTaskDescription, null);

    if (created) {
      onTasksAdded(created);
      setAddTaskDescription("");
    } else {
      // trigger fail alert
      setFailedButton("add");
    }
  }

  return (
    <main className={`mt-10 mx-auto min-w-0 overflow-x-auto relative`}>
      <ul className="flex gap-3">
        {(tasks.get(null) ?? []).map((child: Task) => (
          <div key={child.id} onMouseLeave={() => setIsHovered(null)}>
            <TaskCard
              description={child.description}
              isEditing={false}
              isCompleted={child.isCompleted}
              
              id={child.id}
              taskMap={tasks}
              depth={0}
              maxDepth={7}
              parentId={null}
              onTasksAdded={onTasksAdded}
              onTaskDeleted={onTaskDeleted}
              onTaskUpdated={onTaskUpdated}
              onTaskChanged={onTaskChanged}
              isHovered={isHovered}
              setIsHovered={setIsHovered}
            />
          </div>
        ))}
        <div className="flex justify-between items-start py-1 px-2 pl-1 h-fit text-detail-accent rounded-xl bg-primary-pale">
          <div className="flex w-fit items-center">
            <button
              type="button"
              onClick={(e) => handleAddTaskOnClick(e)}
              aria-label="Add task"
            >
              <span
                className={`inline-block ${failedButton === "add" ? "animate-shake" : ""}`}
              >
                <PlusIcon
                  depth={0}
                  variableName={
                    failedButton === "add" ? "--warning" : "--surface-accent"
                  }
                />
              </span>
            </button>

            <textarea
              className="m-2 w-card-min border-b border-detail-accent field-sizing-content resize-none"
              onChange={(e) => setAddTaskDescription(e.target.value)}
              placeholder="Create new task"
              value={addTaskDescription}
              aria-label="Create new task"
            />
          </div>
        </div>
      </ul>
    </main>
  );
};

export default Board;
