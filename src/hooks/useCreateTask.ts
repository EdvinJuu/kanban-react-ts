import { useState } from "react";
import type { Task } from "../types/types";
import api from "../services/api";


export const useCreateTasks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createTask = async (
    description: string,
    parentId: number | null,
  ): Promise<Task | null> => {
    setIsLoading(true);
    setError(null)

    try {
        // description, parentId is what is expected from req.body in server.js
      const response = await api.post("/tasks", { description, parentId });

      // error check potentially not needed with axios. double check
      if (!response.data) throw new Error(`HTTP ${response.status}`);

      console.log("Task succesfully added", response.data);
      return response.data
    } catch (error) {
      console.error(error);
      setError("Could not load tasks. Is the backend running?");
      return null
    } finally {
      setIsLoading(false);
      
    }
  };

  return { createTask, error, isLoading };
};
