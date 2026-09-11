import type { ReactNode } from "react";

interface childrenProps {
  id: number;
  title: string;
  children: ReactNode;
}

const Board = ({title, children }: childrenProps) => {
  return (
    <div className="border w-fit">
      <h1>{title}</h1>
      <div className="p-2 flex">{children}</div>
    </div>
  );
};

export default Board;
