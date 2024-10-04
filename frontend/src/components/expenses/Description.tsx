/**
 * @file Description.tsx - ./frontend/src/components/expenses
 * @description This component renders an input field to update the description of a specific expense. It is part of the expense management system, allowing users to edit and update the `description` field of the `ExpenseType`. The component handles input changes and propagates the updated expense data back to the parent component through a callback function (`handleExpenseChange`).
 * @author matthewb
 * @date Created: 2024-09-30 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage Import and include the `Description` component in any expense-related form where a description field is required. Pass the current expense object and a handler function for updating the state.
 *        Example usage:
 *        `<Description expense={expense} handleExpenseChange={updateExpense} />`
 * @dependencies React, `ExpenseType` from `../../data/types`
 * @relatedFiles Parent components handling expenses, such as `ExpenseForm.tsx`, and the types file `types.ts`.
 */

import { ChangeEvent, FC } from "react";
import { ExpenseType } from "../../data/types";

interface DescriptionProps {
  expense: ExpenseType;
  handleExpenseChange: (updatedExpense: ExpenseType) => void;
}

const Description: FC<DescriptionProps> = ({
  expense,
  handleExpenseChange,
}) => {
  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedExpense: ExpenseType = {
      ...expense,
      description: event.target.value,
    };
    handleExpenseChange(updatedExpense);
  };

  return (
    <div className="flex flex-col w-full items-start space-y-2">
      <label className="text-gray-600">Description</label>
      <input
        className="p-2 w-full border-grey-300 border-b-2"
        type="text"
        id="description"
        value={expense.description}
        onChange={handleDescriptionChange}
      />
    </div>
  );
};

export default Description;
