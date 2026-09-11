import type { ReactNode } from "react";

interface TestTask {
  children?: ReactNode;
}

const TestTask = ({ children }: TestTask) => {
  return (
    <>
      <div className="border border-blue-800 w-fit p-2 ">
        <div className="flex justify-between ">
          <button>CHECKBOX</button>
          <p>Task Description</p>
        </div>
        {children}
      </div>
    </>
  );
};

export default TestTask;
