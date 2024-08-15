import React, { useState } from "react";

interface DescriptionProps {
  onUpdate: (updatedData: { description: string }) => void;
}

const Description: React.FC<DescriptionProps> = ({ onUpdate }) => {
  const [description, setDescription] = useState<string>("");

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDescription = e.target.value;
    setDescription(updatedDescription);
    onUpdate({ description: updatedDescription });
  };

  return (
    <>
      <label>Description:</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={handleDescriptionChange}
      />
    </>
  );
};

export default Description;
