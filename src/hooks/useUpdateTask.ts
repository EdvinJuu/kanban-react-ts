import { useState } from "react";
import type { Task } from "../types/types";

import api from "../services/api";

export const useUpdateTask = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateTask = async (
    id: number | null,
    changes: Partial<Pick<Task, "description" | "isCompleted">>
  ): Promise<Task | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // description, parentId is what is expected from req.body in server.js
      const response = await api.patch<Task>(`/tasks/${id}`, changes);

      console.log(`Successfully updated task ${id}`, response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      setError("Could not update task.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateTask, error, isLoading };
};
