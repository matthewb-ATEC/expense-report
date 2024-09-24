import React from "react";
import Expense from "./Expense";
import { ExpenseType } from "../data/types";

interface ExpensesProps {
    expenses: ExpenseType[];
    handleExpensesChange: Function;
}

const Expenses: React.FC<ExpensesProps> = ({expenses, handleExpensesChange}) => {
    const handleDeleteExpense = (id: string) => {
        const updatedExpenses: ExpenseType[] = expenses.filter((expense) => expense.id !== id)
        handleExpensesChange(updatedExpenses);
    };

    const handleExpenseChange = (updatedExpense: ExpenseType) => {
        const updatedExpenses: ExpenseType[] = expenses.map((expense) =>
            expense.id === updatedExpense.id ? updatedExpense : expense)
        handleExpensesChange(updatedExpenses);
    };

    return (
        <>
        {expenses.map((expense) => (
          <div className="flex space-x-4 items-start" key={expense.id}>
            <Expense expense={expense} handleExpenseChange={handleExpenseChange} />
            <button
              className="text-red-500 text-nowrap font-bold"
              type="button"
              onClick={() => handleDeleteExpense(expense.id)}
            >
              Delete Expense
            </button>
          </div>
        ))}
        </>
    );
}

export default Expenses;