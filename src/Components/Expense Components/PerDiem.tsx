import React, { useState } from "react";

interface PerDiemProps {
  onUpdate: (updatedData: {
    breakfast: string;
    lunch: string;
    dinner: string;
  }) => void;
}

const PerDiem: React.FC<PerDiemProps> = ({ onUpdate }) => {
  const [breakfast, setBreakfast] = useState<string>("0");
  const [lunch, setLunch] = useState<string>("0");
  const [dinner, setDinner] = useState<string>("0");

  const handleChange = (
    field: "breakfast" | "lunch" | "dinner",
    value: string
  ) => {
    const updatedData = { breakfast, lunch, dinner, [field]: value };
    if (field === "breakfast") setBreakfast(value);
    if (field === "lunch") setLunch(value);
    if (field === "dinner") setDinner(value);
    onUpdate(updatedData);
  };

  return (
    <>
      <label>Breakfast:</label>
      <input
        type="number"
        id="breakfast"
        value={breakfast}
        onChange={(e) => handleChange("breakfast", e.target.value)}
      />

      <label>Lunch:</label>
      <input
        type="number"
        id="lunch"
        value={lunch}
        onChange={(e) => handleChange("lunch", e.target.value)}
      />

      <label>Dinner:</label>
      <input
        type="number"
        id="dinner"
        value={dinner}
        onChange={(e) => handleChange("dinner", e.target.value)}
      />
    </>
  );
};

export default PerDiem;
