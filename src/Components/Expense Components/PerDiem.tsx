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
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col w-full items-start space-y-2">
        <label className="text-gray-600">Breakfast</label>
        <input
          className="p-2 w-full border-grey-300 border-b-2"
          type="number"
          id="breakfast"
          value={breakfast}
          onChange={(e) => handleChange("breakfast", e.target.value)}
        />
      </div>

      <div className="flex flex-col w-full items-start space-y-2">
        <label className="text-gray-600">Lunch</label>
        <input
          className="p-2 w-full border-grey-300 border-b-2"
          type="number"
          id="lunch"
          value={lunch}
          onChange={(e) => handleChange("lunch", e.target.value)}
        />
      </div>

      <div className="flex flex-col w-full items-start space-y-2">
        <label className="text-gray-600"> Dinner</label>
        <input
          className="p-2 w-full border-grey-300 border-b-2"
          type="number"
          id="dinner"
          value={dinner}
          onChange={(e) => handleChange("dinner", e.target.value)}
        />
      </div>
    </div>
  );
};

export default PerDiem;
