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
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center">
        <label className="mr-4 text-nowrap">Breakfast</label>
        <input
          className="p-2 w-full bg-gray-50 border-grey-300 border-b-2"
          type="number"
          id="breakfast"
          value={breakfast}
          onChange={(e) => handleChange("breakfast", e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center">
        <label className="mr-4 text-nowrap">Lunch</label>
        <input
          className="p-2 w-full bg-gray-50 border-grey-300 border-b-2"
          type="number"
          id="lunch"
          value={lunch}
          onChange={(e) => handleChange("lunch", e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center">
        <label className="mr-4 text-nowrap"> Dinner</label>
        <input
          className="p-2 w-full bg-gray-50 border-grey-300 border-b-2"
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
