import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Task } from "../types/types";

const testTasks: Task[] = [
  {
    description: "0. bebop",
    id: 0,
    parentId: null,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "1. bebop",
    id: 1,
    parentId: 0,
    isCompleted: true,
    isEditing: false,
  },
  {
    description: "2. bebop",
    id: 2,
    parentId: 1,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: 4,
    parentId: 2,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: 5,
    parentId: 0,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: 6,
    parentId: null,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: 7,
    parentId: 8,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: 8,
    parentId: 4,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: 9,
    parentId: 1,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: 10,
    parentId: 11,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: 11,
    parentId: 9,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: 12,
    parentId: null,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: 13,
    parentId: 12,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: 14,
    parentId: 12,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: 15,
    parentId: 12,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: 16,
    parentId: 3,
    isCompleted: true,
    isEditing: true,
  },
  {
    description: "3. bebop",
    id: 17,
    parentId: 7,
    isCompleted: true,
    isEditing: true,
  },
];

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
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
