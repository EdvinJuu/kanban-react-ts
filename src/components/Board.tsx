import type { BoardProps, Task } from "../types/types";
import TaskCard from "../components/TaskCard";
import { useState } from "react";
import { useCreateTasks } from "../hooks/useCreateTask";

const Board = ({
  title,
  tasks,
  onTasksAdded,
  onTaskDeleted,
  onTaskUpdated,
  onTaskChanged,
}: BoardProps) => {
  const [addTaskDescription, setAddTaskDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // go through each item in the list. add item with map.get to a list where the parentId matches
  // if it doens't match, create a new list(?? []). Then update the list with the parentId key to include the item.
  // for an initial value create new Map object

  const { createTask } = useCreateTasks();

  async function handleAddTaskOnClick() {
    if (addTaskDescription.trim().length <= 0) return;

    const created = await createTask(addTaskDescription, null);

    if (created) {
      onTasksAdded(created);
      setAddTaskDescription("");
      setIsAdding(false);
    }
  }

  return (
    <div className="border w-fit">
      <h1>{title}</h1>
      <ul className="flex gap-3">
        {(tasks.get(null) ?? []).map((child: Task) => (
          <TaskCard
            description={child.description}
            isEditing={false}
            isCompleted={child.isCompleted}
            key={child.id}
            id={child.id}
            taskMap={tasks}
            depth={0}
            maxDepth={7}
            parentId={null}
            onTasksAdded={onTasksAdded}
            onTaskDeleted={onTaskDeleted}
            onTaskUpdated={onTaskUpdated}
            onTaskChanged={onTaskChanged}
          />
        ))}
        {isAdding ? (
          <div>
            <input
              onChange={(e) => setAddTaskDescription(e.target.value)}
              type="text"
              placeholder="Enter a description"
            ></input>
            <button onClick={handleAddTaskOnClick}>Add Task</button>
          </div>
        ) : (
          <p
            className="p-2 text-sm text-gray-300"
            onClick={() => {
              setIsAdding(true);
            }}
          >
            Add new card
          </p>
        )}
      </ul>
    </div>
  );
};

export default Board;
