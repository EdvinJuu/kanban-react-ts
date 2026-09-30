import { createContext, useContext, useId, useState } from "react";
import type { ReactNode } from "react";
import type { Task } from "../types/types";

/* const testTasks: Task[] = [
  {
    description: "0. bebop",
    id: useId(),
    parentId: null,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "1. bebop",
    id: useId(),
    parentId: 0,
    isCompleted: true,
    isEditing: false,
  },
  {
    description: "2. bebop",
    id: useId(),
    parentId: 1,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: useId(),
    parentId: 2,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: useId(),
    parentId: 0,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: useId(),
    parentId: null,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: useId(),
    parentId: 8,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: useId(),
    parentId: 4,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: useId(),
    parentId: 1,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: useId(),
    parentId: 11,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: useId(),
    parentId: 9,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: useId(),
    parentId: null,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: useId(),
    parentId: 12,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: useId(),
    parentId: 12,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: useId(),
    parentId: 12,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: useId(),
    parentId: 3,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: useId(),
    parentId: 7,
    isCompleted: true,
    isEditing: true,
  },
]; */

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  uniqueId: number
  setUniqueId: React.Dispatch<React.SetStateAction<number>>;
}

  const testTasks2: Task[] = [

  ];

const TasksContext = createContext<TaskContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [uniqueId, setUniqueId] = useState(0);




  const [tasks, setTasks] = useState(
    // add function to check DB for tasks, otherwise return some default state
    testTasks2,
  );

  return (
    <TasksContext.Provider value={{ tasks, setTasks, uniqueId, setUniqueId }}>
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
