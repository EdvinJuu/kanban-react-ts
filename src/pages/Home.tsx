import { useEffect, useState } from "react";
import Board from "../components/Board";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";

import type { Task } from "../types/types";

// DOUBLE CHECK CORRECT COMPONENT FUNCTION CONVENTION IS USED

const Home = () => {
  const { tasks, setTasks, uniqueId, setUniqueId } = useTasks();

  const [addTaskDescription, setAddTaskDescription] = useState("");
const [isAdding, setIsAdding] = useState(false);

  // go through each item in the list. add item with map.get to a list where the parentId matches
  // if it doens't match, create a new list(?? []). Then update the list with the parentId key to include the item.
  // for an initial value create new Map object
  const tasksMapped = tasks.reduce((map, item) => { // MOVE THE MAPPING OUT OF HOME
    const siblings = map.get(item.parentId) ?? [];
    map.set(item.parentId, [...siblings, item]);
    return map;
  }, new Map<number | null, Task[]>());

  function handleAddTaskOnClick(
  ) {
    if (addTaskDescription.length <= 0) return
    const newId = uniqueId + 1; // REPLACE THIS ID SYSTEM WITH SOMETHING THAT WORKS OVER SERVER BETTER
    setUniqueId(newId);

    const newTask: Task = {
      description: addTaskDescription,
      id: newId, // needs to be made unique
      parentId: null,
      isCompleted: false,
      isEditing: false,
    };
    setTasks([...tasks, newTask]);
    setIsAdding(false);
  }

  return (
    <>
      <Navbar />
      <Board title="Boared heheeh" id={0}>
        {tasks && (
          <ul className="flex">
            {(tasksMapped.get(null) ?? []).map(
              // (byParentReduce.get(null) ?? []) extra parentheses makes sure that is evaluated first before map reads it.
              (child) => (
                <TaskCard
                  description={child.description} // HOOK THIS UP
                  isEditing={false} // HOOK THIS UP
                  isCompleted={false} // HOOK THIS UP
                  key={child.id}
                  id={child.id}
                  taskMap={tasksMapped}
                  depth={0}
                  maxDepth={7}
                  parentId={null}
                />
              ),
            )}
            {(isAdding ? (
          <div>
            <input onChange={(e) => setAddTaskDescription(e.target.value)} type="text" placeholder="Enter a description"></input>
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
        ))}
          </ul>
        )}
      </Board>
    </>
  );
};

export default Home;
