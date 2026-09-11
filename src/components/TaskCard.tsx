import { useState } from "react";
import type { TaskProps } from "../types/types";

const TaskCard = ({ description }: TaskProps) => {

  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(description)

  function handleEditOnClick() {setIsEditing(!isEditing)}

  return (
    <div className="border flex w-fit">
      <button onClick={handleEditOnClick}>CHECKBOX</button>
      
      {isEditing ? (
        <input
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
      ) : (
        <p>{editedDescription}</p>
      )}
    </div>
  );
};

export default TaskCard;
