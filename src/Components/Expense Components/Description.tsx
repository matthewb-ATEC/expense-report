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
    <div className="flex-col w-full items-start space-y-2">
      <label className="text-gray-600">Description</label>
      <input
        className="p-2 w-full border-grey-300 border-b-2"
        type="text"
        id="description"
        value={description}
        onChange={handleDescriptionChange}
      />
    </div>
  );
};

export default Description;
