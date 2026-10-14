import Navbar from "../components/Navbar";
import { useReadTasks } from "../hooks/useRead";
import Board from "../components/Board";
import DataBoundary from "../components/DataBoundary";
import type { Task } from "../types/types";

// DOUBLE CHECK CORRECT COMPONENT FUNCTION CONVENTION IS USED

const Home = () => {
  const { content, setContent, isLoading, error } = useReadTasks();

  // add handleTaskAdded here at top level. figure out why here is the proper place.
  //probably to do with content living here.

  const handleTaskAdded = (task: Task) => {
    setContent([...(content ?? []), task]) // either add task to the other content or an empty list if no content
  }

  const handleTaskDeleted = (deletedIds: number[]) => {
    setContent((prev) => (prev ?? []).filter((t) => !deletedIds.includes(t.id)))
    // Passing setContent((content) =>....) instead of setContent(content.filter....) makes sure content
    // is the latest version of itself and avoids problems if multiple changes to content are queued up
    // together. Same as with children(content)
  }
  const handleTaskUpdated = (updatedTask: Task) => {
    setContent((prev) => (prev ?? []).map((t) => t.id === updatedTask.id ? updatedTask : t))
    // Passing setContent((content) =>....) instead of setContent(content.filter....) makes sure content
    // Same concept as with handleDeleteTaskOnClick
    // "prev" is used as the arrow function calls the version of content it already has
  }


  return (
    <>
      <Navbar />
      <DataBoundary data={content} isLoading={isLoading} error={error}>
        {(taskData) => {
          if (!taskData) return <p>The board was not found</p>
          const tasksMapped = taskData.reduce((map, item) => {
            const siblings = map.get(item.parentId) ?? [];
            map.set(item.parentId, [...siblings, item]);
            return map;
          }, new Map<number | null, Task[]>());
          return <Board title="YAAS!" tasks={tasksMapped} id={1} onTasksAdded={handleTaskAdded} onTaskDeleted={handleTaskDeleted} onTaskUpdated={handleTaskUpdated}/>;
        }}
      </DataBoundary>
      {/* <Board title="Boared heheeh" id={0} /> */}
    </>
  );
};

export default Home;
