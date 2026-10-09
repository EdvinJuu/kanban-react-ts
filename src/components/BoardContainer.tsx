// This component contains the useRead hook and guarantees
// content to be Task[] instead of null by being computed
// first as an arrow function through DataBoundary before
//  being passed to Board component.
// Not the nicest looking solution so ideally find out a better one.

import { useReadTasks } from "../hooks/useRead";
import Board from "./Board";
import DataBoundary from "./DataBoundary";

const BoardContainer = () => {
  const { content, isLoading, error } = useReadTasks();

  return (
    <DataBoundary data={content} isLoading={isLoading} error={error}>
      {(tasks) => <Board title="YAAS!" content={tasks} id={1} />}
    </DataBoundary>
  );
};

export default BoardContainer;
