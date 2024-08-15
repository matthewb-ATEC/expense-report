import React, { useState } from "react";
import { costCategories } from "../Data/costCategories";

interface Expense {
  // Define any props you expect to pass to this component
}

const Expense: React.FC<Expense> = (props) => {
  // State for the selected date, cost category, and cost code
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [costCode, setCostCode] = useState<string>("");

  // Handle category selection and update the cost code accordingly
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setSelectedCategory(category);

    // Find the cost code for the selected category
    const selectedCostCode =
      costCategories.find((item) => item.category === category)?.costCode || "";
    setCostCode(selectedCostCode);
  };

  // Check if the selected category has a cost code by default
  const hasDefaultCostCode = () => {
    return costCategories.find(
      (item) => item.category === selectedCategory && item.costCode
    );
  };

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

      {/*Conditional Display for required cost codes <div>Cost Code</div>*/}
      {/*Conditionally display ,Purpose, to, from, milage */}
      {/* conditionally display if not milage <div>Amount</div>*/}
    </>
  );
};

export default Expense;
