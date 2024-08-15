import React, { useState } from "react";

const Description: React.FC = () => {
  const [description, setDescription] = useState<string>("");

  return (
    <>
      <label>Description:</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </>
  );
};

export default Description;
