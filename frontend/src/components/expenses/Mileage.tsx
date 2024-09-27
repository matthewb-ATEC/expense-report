import React, { ChangeEvent } from "react";
import { ExpenseType } from "../../data/types";

interface MileageProps {
  expense: ExpenseType;
  handleExpenseChange: Function;
}

const Mileage: React.FC<MileageProps> = ({ expense, handleExpenseChange }) => {
  const handlePurposeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const updatedExpense: ExpenseType = {
      ...expense,
      purpose: event.target.value,
    };
    handleExpenseChange(updatedExpense);
  };

  const handleFromChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedExpense: ExpenseType = {
      ...expense,
      fromLocation: event.target.value,
    };
    handleExpenseChange(updatedExpense);
  };

  const handleToChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedExpense: ExpenseType = {
      ...expense,
      toLocation: event.target.value,
    };
    handleExpenseChange(updatedExpense);
  };

  const handleMileageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedExpense: ExpenseType = {
      ...expense,
      mileage: Number(event.target.value),
    };
    handleExpenseChange(updatedExpense);
  };

  const handleRoundTripChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedExpense: ExpenseType = {
      ...expense,
      roundTrip: event.target.checked,
    };
    handleExpenseChange(updatedExpense);
  };

  return (
    <>
      <div className="flex flex-col w-full items-start space-y-2">
        <label>Purpose</label>
        <select
          className="p-2 w-full border-grey-300 border-b-2"
          id="purpose"
          value={expense.purpose}
          onChange={handlePurposeChange}
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Business">Business</option>
          <option value="Personal">Personal</option>
        </select>
      </div>

      <div className="flex flex-col w-full items-start space-y-2">
        <label>From</label>
        <input
          className="p-2 w-full border-grey-300 border-b-2"
          type="text"
          id="from"
          value={expense.fromLocation}
          onChange={handleFromChange}
        />
      </div>

      <div className="flex flex-col w-full items-start space-y-2">
        <label>To</label>
        <input
          className="p-2 w-full border-grey-300 border-b-2"
          type="text"
          id="to"
          value={expense.toLocation}
          onChange={handleToChange}
        />
      </div>

      <div className="flex flex-col w-full items-start space-y-2">
        <label>Mileage</label>
        <input
          className="p-2 w-full border-grey-300 border-b-2"
          type="number"
          id="mileage"
          value={expense.mileage}
          onChange={handleMileageChange}
        />
      </div>

      <div className="flex w-full items-center justify-between">
        <label className="text-gray-600 text-nowrap">Round Trip</label>
        <input
          type="checkbox"
          id="roundTrip"
          checked={expense.roundTrip}
          onChange={handleRoundTripChange}
        />
      </div>
    </>
  );
};

export default Mileage;
