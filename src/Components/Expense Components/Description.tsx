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
        className="p-2 w-full bg-gray-50 border-grey-300 border-b-2"
        type="text"
        id="description"
        value={description}
        onChange={handleDescriptionChange}
      />
    </>
  );
};

export default Description;
