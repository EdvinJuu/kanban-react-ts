// make sure to implement aria-live

import type { ReactNode } from "react";

interface DataBoundaryProps<T> {
  isLoading: boolean;
  error: string | null;
  data: T | null;
  children: (data: T) => ReactNode;
}
// WORKING GOOD, NEED TO MAKE ERRORS MORE USER FRIENDLY I.E NOT DIRECT ERRORS, JUST LAYMAN EXPLANATION WHAT IT IS
function DataBoundary<T>({
  isLoading,
  error,
  data,
  children,
}: DataBoundaryProps<T>) {
  if (isLoading) return <p className="text-detail-accent-pale">Loading...</p>;
  if (error) {
    return <p className="text-detail-accent-pale">{error}</p>;
  }
  if (data === null) {
    return null;
  }
  return <>{children(data)}</>;
}

export default DataBoundary;
