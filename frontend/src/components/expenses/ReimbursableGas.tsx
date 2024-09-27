import React from "react";
import { ExpenseType } from "../../data/types";

interface ReimbursableGasProps {
  expense: ExpenseType;
  handleExpenseChange: Function;
}

const ReimbursableGas: React.FC<ReimbursableGasProps> = ({
  expense,
  handleExpenseChange,
}) => {
  const handleTaxableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedExpense: ExpenseType = {
      ...expense,
      taxable: e.target.checked,
    };
    handleExpenseChange(updatedExpense);
  };

  return (
    <div className="flex w-full justify-between">
      <label className="text-gray-600">Taxable</label>
      <input
        type="checkbox"
        id="taxable"
        checked={expense.taxable}
        onChange={handleTaxableChange}
      />
    </div>
  );
};

export default ReimbursableGas;
