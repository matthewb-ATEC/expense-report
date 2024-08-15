import React, { useState } from "react";

const Milage: React.FC = () => {
  const [purpose, setPurpose] = useState<string>("");
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [milage, setMilage] = useState<string>("0");
  const [roundTrip, setRoundTrip] = useState<boolean>(false);

  return (
    <>
      <label>Purpose:</label>
      <select
        id="purpose"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
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
        onChange={(e) => setFromLocation(e.target.value)}
      />

      <label>To:</label>
      <input
        type="text"
        id="to"
        value={toLocation}
        onChange={(e) => setToLocation(e.target.value)}
      />

      <label>Milage:</label>
      <input
        type="number"
        id="milage"
        value={milage}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value >= 0) {
            setMilage(value.toString());
          }
        }}
      />

      <label>Round Trip</label>
      <input
        type="checkbox"
        id="roundTrip"
        checked={roundTrip}
        onChange={(e) => setRoundTrip(e.target.checked)}
      />
    </>
  );
};

export default Milage;
