import { ChangeEvent, FC } from "react";
import { categories } from "../data/categories";
import ReimbursableGas from "./expenses/ReimbursableGas";
import Description from "./expenses/Description";
import PerDiem from "./expenses/PerDiem";
import Mileage from "./expenses/Mileage";
import {
  ExpenseType,
} from "../data/types";
import Attachments from "./Attachments";

interface ExpenseProps {
  expense: ExpenseType;
  handleExpenseChange: Function;
}

const Expense: FC<ExpenseProps> = ({ expense, handleExpenseChange }) => {
  const handleDateChange = (
   event: ChangeEvent<HTMLInputElement>
  ) => {
    const newDate = event.target.value;
    const updatedExpense: ExpenseType = {
      ...expense,
      date: newDate,
    }
    handleExpenseChange(updatedExpense)
  };

  const handleCategoryChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const newCostCategory = event.target.value;
    const newCostCode =
      categories.find((item) => item.category === newCostCategory)?.costCode || "";

    const updatedExpense: ExpenseType = {
      ...expense,
      costCode: newCostCode,
      costCategory: newCostCategory
    }
    handleExpenseChange(updatedExpense)
  };

  const handleCostCodeChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const updatedExpense:  ExpenseType = {
      ...expense,
      costCode: event.target.value
    }
    handleExpenseChange(updatedExpense)
  };

  const handleCostChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const cost = Number(event.target.value);
    const updatedExpense:  ExpenseType = {
      ...expense,
      cost: cost
    }
    handleExpenseChange(updatedExpense)
  }

  const requiresCostCode = () => {
    return categories.some(
      (item) => item.category === expense.costCategory && item.costCode === ""
    );
  };

  const showCostInput = () => {
    return expense.costCategory &&
      expense.costCategory !== "Mileage" &&
      expense.costCategory !== "Per Diem"
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4">
        {/* Date Picker */}
        <div className="flex flex-col items-start space-y-2">
          <label className="text-gray-600" htmlFor="date">
            Date
          </label>
          <input
            className="p-2 w-full border-grey-300 border-b-2"
            type="date"
            id="date"
            onChange={handleDateChange}
          />
        </div>

        {/* Cost Category Dropdown */}
        <div className="flex flex-col items-start space-y-2">
          <label className="text-gray-600 text-nowrap" htmlFor="costCategory">
            Cost Category
          </label>
          <select
            className="p-2 w-full border-grey-300 border-b-2"
            id="costCategory"
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((costCategory, index) => (
              <option key={index} value={costCategory.category}>
                {costCategory.category}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional Rendering for Cost Code */}
        {expense.costCategory && requiresCostCode() && (
        <div className="flex flex-col space-y-2 items-start">
          <label className="text-gray-600 text-nowrap" htmlFor="costCode">
            Cost Code
          </label>
          <input
            className="p-2 border-grey-300 border-b-2"
            type="text"
            id="costCode"
            onChange={() => handleCostCodeChange}
            placeholder="Enter cost code"
          />
        </div>
        )}

        {/* Conditional Rendering for Expense Type */}
        {expense.costCategory === "Reimbursable Gas" && <ReimbursableGas expense={expense} handleExpenseChange={handleExpenseChange}/>}
        {expense.costCategory === "Client Entertainment" && <Description expense={expense} handleExpenseChange={handleExpenseChange}/>}
        {expense.costCategory === "Per Diem" && <PerDiem expense={expense} handleExpenseChange={handleExpenseChange}/>}
        {expense.costCategory === "Job Site Material" && <Description expense={expense} handleExpenseChange={handleExpenseChange}/>}
        {expense.costCategory === "Mileage" && <Mileage expense={expense} handleExpenseChange={handleExpenseChange}/>}
        {expense.costCategory === "Other" && <Description expense={expense} handleExpenseChange={handleExpenseChange}/>}

        {/* Conditional Rendering for Cost Input */}
        {showCostInput() && (
          <div className="flex flex-col items-start space-y-2">
            <label className="text-gray-600">Cost</label>
            <input
              className="p-2 border-grey-300 border-b-2"
              type="number"
              id="cost"
              onChange={() => handleCostChange}
            />
          </div>
        )}

        <Attachments expense={expense} handleExpenseChange={handleExpenseChange}/>
      </div>
    </div>
  );
};

export default Expense;
