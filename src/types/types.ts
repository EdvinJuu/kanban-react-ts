interface TaskNoParent {
  id: number;
  description: string;
  isCompleted: boolean;
  isEditing: boolean;
  listPosition: number;
}
// https://stackoverflow.com/questions/37688318/typescript-interface-possible-to-make-one-or-the-other-properties-required
export interface TaskWithParent extends TaskNoParent {
    parentId?: number;
}

export type TaskProps = TaskNoParent | TaskWithParent