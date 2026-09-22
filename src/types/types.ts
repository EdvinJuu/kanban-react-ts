import type { ReactNode } from "react";

export interface Task {
  id: number;
  parentId: number | null;
  description: string;
  isCompleted: boolean;
  isEditing: boolean;
}

export interface TaskRecursionProps extends Task {
  taskMap: Map<number | null, Task[]>;
  depth: number;
  maxDepth: number;
}

export interface ListProps {
  id: number;
  boardId: number; // fix foreignKey
  title: string;
  totalTasks: number;
  children?: ReactNode;
}


/* 
// https://stackoverflow.com/questions/37688318/typescript-interface-possible-to-make-one-or-the-other-properties-required
export interface TaskWithParent extends TaskNoParent {
    parentId?: number;
}

export type TaskProps = TaskNoParent | TaskWithParent */
// not a fan of solution, changed to parentId: boolean | null instead, simpler
