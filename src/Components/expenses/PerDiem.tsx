import React, { ChangeEvent } from "react";
import { ExpenseType } from "../../data/types";

interface PerDiemProps {
  expense: ExpenseType,
  handleExpenseChange: Function
}

const PerDiem: React.FC<PerDiemProps> = ({ expense, handleExpenseChange }) => {
  
  const handleBreakfastChange = (
   event: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedExpense: ExpenseType = {
      ...expense,
      breakfast: event.target.checked
    }
    handleExpenseChange(updatedExpense);
  };

  const handleLunchChange = (
   event: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedExpense: ExpenseType = {
      ...expense,
      lunch: event.target.checked
    }
    handleExpenseChange(updatedExpense);
  };

  const handleDinnerChange = (
   event: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedExpense: ExpenseType = {
      ...expense,
      dinner: event.target.checked
    }
    handleExpenseChange(updatedExpense);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col w-full items-start space-y-2">
        <label className="text-gray-600">Breakfast</label>
        <input
          className="p-2 w-full border-grey-300 border-b-2"
          type="checkbox"
          id="breakfast"
          onChange={handleBreakfastChange}
        />
      </div>

      <div className="flex flex-col w-full items-start space-y-2">
        <label className="text-gray-600">Lunch</label>
        <input
          className="p-2 w-full border-grey-300 border-b-2"
          type="checkbox"
          id="lunch"
          onChange={handleLunchChange}
        />
      </div>

      <div className="flex flex-col w-full items-start space-y-2">
        <label className="text-gray-600"> Dinner</label>
        <input
          className="p-2 w-full border-grey-300 border-b-2"
          type="checkbox"
          id="dinner"
          onChange={handleDinnerChange}
        />
      </div>
    </div>
  );
};

export default PerDiem;
