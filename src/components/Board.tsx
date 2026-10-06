import type { BoardProps, Task } from "../types/types";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";
import { useState } from "react";

const Board = ({ title, tasks }: BoardProps) => {
  const { setTasks, uniqueId, setUniqueId } = useTasks();

  const [addTaskDescription, setAddTaskDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // go through each item in the list. add item with map.get to a list where the parentId matches
  // if it doens't match, create a new list(?? []). Then update the list with the parentId key to include the item.
  // for an initial value create new Map object
  const tasksMapped = tasks.reduce((map, item) => {
    const siblings = map.get(item.parentId) ?? [];
    map.set(item.parentId, [...siblings, item]);
    return map;
  }, new Map<number | null, Task[]>());

  function handleAddTaskOnClick() {
    if (addTaskDescription.length <= 0) return;
    const newId = uniqueId + 1; // REPLACE THIS ID SYSTEM WITH SOMETHING THAT WORKS BETTER OVER SERVER
    setUniqueId(newId);

    const newTask: Task = {
      description: addTaskDescription,
      id: newId,
      parentId: null,
      isCompleted: false,
      isEditing: false,
    };
    setTasks([...tasks, newTask]);
    setIsAdding(false);
  }

    return (
      <div className="border w-fit">
        <h1>{title}</h1>
        {tasks && (
          <ul className="flex gap-3">
            {(tasksMapped.get(null) ?? []).map((child) => (
              <TaskCard
                description={child.description}
                isEditing={false} // Keep tasks clean when reloaded
                isCompleted={child.isCompleted}
                key={child.id}
                id={child.id}
                taskMap={tasksMapped}
                depth={0}
                maxDepth={7}
                parentId={null}
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
        )}
      </div>
    );
  }

export default Board;
