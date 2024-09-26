import { ChangeEvent, FC } from "react";
import { ExpenseType } from "../../data/types";

interface DescriptionProps {
  expense: ExpenseType;
  handleExpenseChange: Function;
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
