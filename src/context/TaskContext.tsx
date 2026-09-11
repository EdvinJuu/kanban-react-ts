import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { TaskProps } from "../types/types";

const testTasks: TaskProps[] = [
  {
    description: "bebop",
    id: 0,
    parentId: 0,
    listPosition: 0,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "bebop",
    id: 1,
    parentId: 0,
    listPosition: 0,
    isCompleted: true,
    isEditing: false,
  },
  {
    description: "bebop",
    id: 2,
    parentId: 0,
    listPosition: 0,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "bebop",
    id: 3,
    parentId: 0,
    listPosition: 0,
    isCompleted: true,
    isEditing: true,
  },
];

interface TaskContextType {
  tasks: TaskProps[];
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
}

const TasksContext = createContext<TaskContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState(
    // add function to check DB for tasks, otherwise return some default state
    testTasks,
  );

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}
