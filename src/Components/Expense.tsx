import React, { useEffect, useState } from "react";
import { costCategories } from "../Data/costCategories";
import ReimbursableGas from "./Expense Components/ReimbursableGas";
import Description from "./Expense Components/Description";
import PerDiem from "./Expense Components/PerDiem";
import Milage from "./Expense Components/Milage";
import { Expense as ExpenseType } from "../Types";

interface ExpenseProps {
  expense: ExpenseType;
  updateExpense: (updatedExpense: ExpenseType) => void;
}

const CATEGORY_COMPONENT_MAP: {
  [key: string]: React.FC<{ onUpdate: (updatedData: any) => void }>;
} = {
  "Reimbursable Gas": ReimbursableGas,
  "Client Entertainment": Description,
  "Per Diem": PerDiem,
  Milage: Milage,
  Other: Description,
  "Job Site Material": Description,
};

const Expense: React.FC<ExpenseProps> = ({ expense, updateExpense }) => {
  const [selectedDate, setSelectedDate] = useState<string>(expense.date);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    expense.costCategory
  );
  const [costCode, setCostCode] = useState<string>(expense.costCode);
  const [cost, setCost] = useState<string>(expense.cost?.toString() || "0");

  useEffect(() => {
    updateExpense({
      ...expense,
      date: selectedDate,
      costCategory: selectedCategory,
      costCode,
      cost: parseFloat(cost),
    });
  }, [selectedDate, selectedCategory, costCode, cost]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setSelectedCategory(category);
    const selectedCostCode =
      costCategories.find((item) => item.category === category)?.costCode || "";
    setCostCode(selectedCostCode);
  };

  const handleChildUpdate = (updatedData: any) => {
    updateExpense({
      ...expense,
      ...updatedData,
    });
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
      {SelectedComponent && <SelectedComponent onUpdate={handleChildUpdate} />}

      {/* Conditional Rendering for Cost Input */}
      {selectedCategory &&
        selectedCategory !== "Milage" &&
        selectedCategory !== "Per Diem" &&
        renderCostInput()}
    </>
  );
};

export default Expense;
