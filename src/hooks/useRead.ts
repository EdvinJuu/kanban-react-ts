import { useEffect, useState } from "react";
import type { Task } from "../types/types";

const API_URL = "http://localhost:5000/api/tasks";

export const useReadTasks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<Task[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      setError(null)

      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        console.log("data fetched")
        const data = await response.json();
        setContent(data);
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
