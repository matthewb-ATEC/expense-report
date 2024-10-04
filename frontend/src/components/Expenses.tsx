/**
 * @file Expenses.tsx - ./frontend/src/components
 * @description The `Expenses` component manages a list of expenses related to a specific project. It allows users to view, add, update, and delete expenses efficiently. This component handles expense state management and integrates with the `Expense` sub-component to render individual expense entries.
 * @author matthewb
 * @date Created: 2024-09-30 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage This component is intended to be used within the context of a project management application. It should receive a `project` object, a list of `expenses`, and a handler function for updating expenses. Example usage:
 *        `<Expenses project={selectedProject} expenses={selectedProject.expenses} handleExpensesChange={handleExpensesChange} />`
 * @dependencies React for building the component and managing state, `uuid` for generating unique IDs for new expenses, and the `Expense` component for rendering individual expense items.
 * @relatedFiles Related files include `Expense.tsx`, which defines the structure and functionality of individual expense items, and `ExpenseReport.tsx`, which may utilize this component to manage expenses for the selected project.
 */

import React from "react";
import Expense from "./Expense";
import { ExpenseType, ProjectType } from "../data/types";
import { v4 as uuidv4 } from "uuid";

interface ExpensesProps {
  project: ProjectType;
  expenses: ExpenseType[];
  handleExpensesChange: (updatedExpenses: ExpenseType[]) => void;
}

const Expenses: React.FC<ExpensesProps> = ({
  project,
  expenses,
  handleExpensesChange,
}) => {
  const handleExpenseChange = (updatedExpense: ExpenseType) => {
    const updatedExpenses: ExpenseType[] | undefined = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    handleExpensesChange(updatedExpenses);
  };

  const handleAddExpense = () => {
    const newExpense: ExpenseType = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      id: uuidv4(),
      date: "",
      costCategory: "",
      costCode: "",
    };

    const updatedExpenses = expenses.concat(newExpense);
    handleExpensesChange(updatedExpenses);
  };

  const handleDeleteExpense = (id: string) => {
    const updatedExpenses: ExpenseType[] | undefined = expenses.filter(
      (expense) => expense.id !== id
    );
    handleExpensesChange(updatedExpenses);
  };

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="text-xl font-bold">Expenses</div>
        <div className="text-gray-500">{project.name}</div>
      </div>
      {expenses.map((expense) => (
        <Expense
          key={expense.id}
          expense={expense}
          handleExpenseChange={handleExpenseChange}
          handleDeleteExpense={handleDeleteExpense}
        />
      ))}
      <button
        className="w-full self-center p-2 bg-white shadow-sm rounded-md text-ATECblue font-bold transform transition-transform duration-300 ease-in-out hover:scale-105"
        type="button"
        onClick={handleAddExpense}
      >
        Add Expense
      </button>
    </div>
  );
};

export default Expenses;
