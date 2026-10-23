import { useEffect, useState } from "react";
import type { Task } from "../types/types";
import api from "../services/api";

export const useReadTasks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<Task[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      setError(null)

      try {
        const response = await api.get<Task[]>("/tasks");
        setContent(response.data);
         
      } catch (error) {
        console.error(error);
        setError("Could not load tasks. Is the backend running?");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTasks()
  }, []);
  return { content, setContent, error, isLoading };
};
