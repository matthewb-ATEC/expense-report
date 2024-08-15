import React, { useState } from "react";

const PerDiem: React.FC = () => {
  const [breakfast, setBreakfast] = useState<string>("0");
  const [lunch, setLunch] = useState<string>("0");
  const [dinner, setDinner] = useState<string>("0");

  return (
    <>
      <label>Breakfast:</label>
      <input
        type="number"
        id="breakfast"
        value={breakfast}
        onChange={(e) => {
          const value = parseFloat(e.target.value);
          if (value >= 0) {
            setBreakfast(value.toFixed(2)); // Format to two decimal places
          }
        }}
      />

      <label>Lunch:</label>
      <input
        type="number"
        id="lunch"
        value={lunch}
        onChange={(e) => {
          const value = parseFloat(e.target.value);
          if (value >= 0) {
            setLunch(value.toFixed(2)); // Format to two decimal places
          }
        }}
      />

      <label>Dinner:</label>
      <input
        type="number"
        id="dinner"
        value={dinner}
        onChange={(e) => {
          const value = parseFloat(e.target.value);
          if (value >= 0) {
            setDinner(value.toFixed(2)); // Format to two decimal places
          }
        }}
      />
    </>
  );
};

export default PerDiem;
