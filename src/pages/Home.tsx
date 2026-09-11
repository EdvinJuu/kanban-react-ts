import List from "../components/List";
import Board from "../components/Board";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";

import type { TaskProps } from "../types/types";

// DOUBLE CHECK CORRECT COMPONENT FUNCTION CONVENTION IS USED

const Home = () => {
  const { tasks } = useTasks();
  return (
    <>
      {" "}
      <Navbar />
      <Board title="Boared heheeh" id={0}>
        <List title="BIG LIST TITLE!" id={0} boardId={0} totalTasks={3}>
          <TaskCard
            description="asd"
            id={0}
            parentId={0}
            listPosition={0}
            isCompleted
            isEditing={false}
          />
          <TaskCard
            description="asdasd"
            id={0}
            parentId={0}
            listPosition={0}
            isCompleted
            isEditing={false}
          />
          <TaskCard
            description="asdsadadadw"
            id={0}
            parentId={0}
            listPosition={0}
            isCompleted
            isEditing={false}
          />
          <TaskCard
            description="dh cdvx"
            id={0}
            parentId={0}
            listPosition={0}
            isCompleted
            isEditing={true}
          />
        </List>
        <List title="SMALL LIST TITLE!" id={0} boardId={0} totalTasks={3}>
          <TaskCard
            description="df h dfh d"
            id={0}
            parentId={0}
            listPosition={0}
            isCompleted
            isEditing={false}
          />
          <TaskCard
            description="sdf we asD"
            id={0}
            parentId={0}
            listPosition={0}
            isCompleted
            isEditing={true}
          />
        </List>
        <List title="context List" id={0} boardId={0} totalTasks={3}>
          {tasks && (
            <ul>
              {tasks.map((task: TaskProps) => (
                <TaskCard
                  id={task.id}
                  description={task.description}
                  isCompleted={task.isCompleted}
                  isEditing={task.isEditing}
                  listPosition={task.listPosition}
                  key={task.id}
                />
              ))}
            </ul>
          )}
        </List>
      </Board>
    </>
  );
};

export default Home