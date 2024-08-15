import React, { useState } from "react";

interface MilageProps {
  onUpdate: (updatedData: {
    purpose: string;
    fromLocation: string;
    toLocation: string;
    milage: string;
    roundTrip: boolean;
  }) => void;
}

const Milage: React.FC<MilageProps> = ({ onUpdate }) => {
  const [purpose, setPurpose] = useState<string>("");
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [milage, setMilage] = useState<string>("0");
  const [roundTrip, setRoundTrip] = useState<boolean>(false);

  const handleChange = (field: string, value: any) => {
    const updatedData = {
      purpose,
      fromLocation,
      toLocation,
      milage,
      roundTrip,
      [field]: value,
    };
    if (field === "purpose") setPurpose(value);
    if (field === "fromLocation") setFromLocation(value);
    if (field === "toLocation") setToLocation(value);
    if (field === "milage") setMilage(value);
    if (field === "roundTrip") setRoundTrip(value);
    onUpdate(updatedData);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <label className="mr-4 text-nowrap">Purpose</label>
        <select
          className="p-2 w-full bg-gray-50 border-grey-300 border-b-2"
          id="purpose"
          value={purpose}
          onChange={(e) => handleChange("purpose", e.target.value)}
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Business">Business</option>
          <option value="Personal">Personal</option>
        </select>
      </div>

      <div className="flex justify-between items-center">
        <label className="mr-4 text-nowrap">From</label>
        <input
          className="p-2 w-full bg-gray-50 border-grey-300 border-b-2"
          type="text"
          id="from"
          value={fromLocation}
          onChange={(e) => handleChange("fromLocation", e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center">
        <label className="mr-4 text-nowrap">To</label>
        <input
          className="p-2 w-full bg-gray-50 border-grey-300 border-b-2"
          type="text"
          id="to"
          value={toLocation}
          onChange={(e) => handleChange("toLocation", e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center">
        <label className="mr-4 text-nowrap">Milage</label>
        <input
          className="p-2 w-full bg-gray-50 border-grey-300 border-b-2"
          type="number"
          id="milage"
          value={milage}
          onChange={(e) => handleChange("milage", e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center">
        <label className="mr-4 text-nowrap">Round Trip</label>
        <input
          type="checkbox"
          id="roundTrip"
          checked={roundTrip}
          onChange={(e) => handleChange("roundTrip", e.target.checked)}
        />
      </div>
    </>
  );
};

export default Milage;
