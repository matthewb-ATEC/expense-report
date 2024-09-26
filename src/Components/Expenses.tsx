import React from "react";
import Expense from "./Expense";
import { ExpenseType, ProjectType } from "../data/types";
import { v4 as uuidv4 } from "uuid";

interface ExpensesProps {
  project: ProjectType | undefined;
  expenses: ExpenseType[] | undefined;
  handleExpensesChange: Function;
}

const Expenses: React.FC<ExpensesProps> = ({
  project,
  expenses,
  handleExpensesChange,
}) => {
  const handleExpenseChange = (updatedExpense: ExpenseType) => {
    const updatedExpenses: ExpenseType[] | undefined = expenses?.map(
      (expense) => (expense.id === updatedExpense.id ? updatedExpense : expense)
    );
    handleExpensesChange(updatedExpenses);
  };

  const handleAddExpense = () => {
    const newExpense: ExpenseType = {
      id: uuidv4(),
      date: "",
      costCategory: "",
      costCode: "",
    };

    const updatedExpenses = expenses?.concat(newExpense);
    handleExpensesChange(updatedExpenses);
  };

  const handleDeleteExpense = (id: string) => {
    const updatedExpenses: ExpenseType[] | undefined = expenses?.filter(
      (expense) => expense.id !== id
    );
    handleExpensesChange(updatedExpenses);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="text-xl font-bold">Expenses</div>
        <div className="text-gray-500">{project?.name}</div>
      </div>
      {expenses?.map((expense) => (
        <Expense
          key={expense.id}
          expense={expense}
          handleExpenseChange={handleExpenseChange}
          handleDeleteExpense={handleDeleteExpense}
        />
      ))}
      <button
        className="w-full self-center p-2 bg-white shadow-sm rounded-md text-ATECblue font-bold"
        type="button"
        onClick={handleAddExpense}
      >
        Add Expense
      </button>
    </div>
  );
};

export default Expenses;
