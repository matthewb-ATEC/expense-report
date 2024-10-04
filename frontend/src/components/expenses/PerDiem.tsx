/**
 * @file PerDiem.tsx - ./frontend/src/components/expenses
 * @description This component allows users to select per diem meal options for an expense. It includes checkboxes for breakfast, lunch, and dinner, which update the `ExpenseType` object accordingly when selected. The component is used to track meal reimbursements based on per diem allowances, providing a simple way to log which meals were covered during business trips or other expenses where per diem applies. The state changes are handled via the passed `handleExpenseChange` function to maintain the expense object in a parent component.
 * @author matthewb
 * @date Created: 2024-09-30 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage Import and use the `PerDiem` component within an expense form where users need to track meals for per diem.
 *        Example usage:
 *        `<PerDiem expense={expense} handleExpenseChange={updateExpense} />`
 * @dependencies React, `ExpenseType` from `../../data/types`.
 * @relatedFiles Related files include parent components such as `ExpenseForm.tsx` and the `types.ts` file that defines `ExpenseType`.
 */

import React, { ChangeEvent } from "react";
import { ExpenseType } from "../../data/types";

interface PerDiemProps {
  expense: ExpenseType;
  handleExpenseChange: (updatedExpense: ExpenseType) => void;
}

const PerDiem: React.FC<PerDiemProps> = ({ expense, handleExpenseChange }) => {
  const handleBreakfastChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedExpense: ExpenseType = {
      ...expense,
      breakfast: event.target.checked,
    };
    handleExpenseChange(updatedExpense);
  };

  const handleLunchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedExpense: ExpenseType = {
      ...expense,
      lunch: event.target.checked,
    };
    handleExpenseChange(updatedExpense);
  };

  const handleDinnerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedExpense: ExpenseType = {
      ...expense,
      dinner: event.target.checked,
    };
    handleExpenseChange(updatedExpense);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex w-full justify-between">
        <label className="text-gray-600">Breakfast</label>
        <input
          className="border-grey-300 border-b-2"
          type="checkbox"
          id="breakfast"
          checked={expense.breakfast}
          onChange={handleBreakfastChange}
        />
      </div>

      <div className="flex w-full justify-between">
        <label className="text-gray-600">Lunch</label>
        <input
          className="border-grey-300 border-b-2"
          type="checkbox"
          id="lunch"
          checked={expense.lunch}
          onChange={handleLunchChange}
        />
      </div>

      <div className="flex w-full justify-between">
        <label className="text-gray-600"> Dinner</label>
        <input
          className="border-grey-300 border-b-2"
          type="checkbox"
          id="dinner"
          checked={expense.dinner}
          onChange={handleDinnerChange}
        />
      </div>
    </div>
  );
};

export default PerDiem;
