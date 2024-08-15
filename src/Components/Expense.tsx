import React, { useState } from "react";
import { costCategories } from "../Data/costCategories";
import ReimbursableGas from "./Expense Components/ReimbursableGas";
import Description from "./Expense Components/Description";
import PerDiem from "./Expense Components/PerDiem";
import Milage from "./Expense Components/Milage";

interface Expense {
  // Define any props you expect to pass to this component
}

const CATEGORY_COMPONENT_MAP: { [key: string]: React.FC } = {
  "Reimbursable Gas": ReimbursableGas,
  "Client Entertainment": Description,
  "Per Diem": PerDiem,
  Milage: Milage,
  Other: Description,
  "Job Site Material": Description,
};

const Expense: React.FC<Expense> = (props) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [costCode, setCostCode] = useState<string>("");
  const [cost, setCost] = useState<string>("0");

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setSelectedCategory(category);

    const selectedCostCode =
      costCategories.find((item) => item.category === category)?.costCode || "";
    setCostCode(selectedCostCode);
  };

  const hasDefaultCostCode = () => {
    return costCategories.some(
      (item) => item.category === selectedCategory && item.costCode
    );
  };

  const renderCostCodeInput = () => (
    <div>
      <label htmlFor="costCode">Cost Code:</label>
      {hasDefaultCostCode() ? (
        <div id="costCode">{costCode}</div>
      ) : (
        <input
          type="text"
          id="costCode"
          value={costCode}
          onChange={(e) => setCostCode(e.target.value)}
          placeholder="Enter cost code"
        />
      )}
    </div>
  );

  const renderCostInput = () => (
    <div>
      <label>Cost:</label>
      <input
        type="number"
        id="cost"
        value={cost}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value >= 0) {
            setCost(value.toString());
          }
        }}
      />
    </div>
  );

  const SelectedComponent = CATEGORY_COMPONENT_MAP[selectedCategory] || null;

  return (
    <>
      {/* Date Picker */}
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Cost Category Dropdown */}
      <div>
        <label htmlFor="costCategory">Cost Category:</label>
        <select
          id="costCategory"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>
            Select a category
          </option>
          {costCategories.map((costCategory, index) => (
            <option key={index} value={costCategory.category}>
              {costCategory.category}
            </option>
          ))}
        </select>
      </div>

      {/* Conditional Rendering for Cost Code */}
      {selectedCategory && renderCostCodeInput()}

      {/* Conditional Rendering for Expense Type */}
      {SelectedComponent && <SelectedComponent />}

      {/* Conditional Rendering for Cost Input */}
      {selectedCategory &&
        selectedCategory !== "Milage" &&
        selectedCategory !== "Per Diem" &&
        renderCostInput()}
    </>
  );
};

export default Expense;
