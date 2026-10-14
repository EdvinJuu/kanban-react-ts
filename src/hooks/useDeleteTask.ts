import { useState } from "react";
import api from "../services/api";


export const useDeleteTask = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const deleteTask = async (id: number): Promise<number[] | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // description, parentId is what is expected from req.body in server.js
      const response = await api.delete<{ deletedIds: number[]}>((`/tasks/${id}`));

      console.log("Task(s) succesfully deleted", response.data.deletedIds);
      return response.data.deletedIds;
    } catch (error) {
      console.error(error);
      setError("Could not delete the task.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteTask, error, isLoading };
};
