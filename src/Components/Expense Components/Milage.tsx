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
      <label>Purpose:</label>
      <select
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

      <label>From:</label>
      <input
        type="text"
        id="from"
        value={fromLocation}
        onChange={(e) => handleChange("fromLocation", e.target.value)}
      />

      <label>To:</label>
      <input
        type="text"
        id="to"
        value={toLocation}
        onChange={(e) => handleChange("toLocation", e.target.value)}
      />

      <label>Milage:</label>
      <input
        type="number"
        id="milage"
        value={milage}
        onChange={(e) => handleChange("milage", e.target.value)}
      />

      <label>Round Trip</label>
      <input
        type="checkbox"
        id="roundTrip"
        checked={roundTrip}
        onChange={(e) => handleChange("roundTrip", e.target.checked)}
      />
    </>
  );
};

export default Milage;
