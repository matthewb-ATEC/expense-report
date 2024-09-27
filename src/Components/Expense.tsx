import { ChangeEvent, FC } from "react";
import { categories } from "../data/categories";
import ReimbursableGas from "./expenses/ReimbursableGas";
import Description from "./expenses/Description";
import PerDiem from "./expenses/PerDiem";
import Mileage from "./expenses/Mileage";
import { ExpenseType } from "../data/types";
import Attachments from "./Attachments";
import Project from "./Project";

interface ExpenseProps {
  expense: ExpenseType;
  handleExpenseChange: Function;
  handleDeleteExpense: Function;
}

const Expense: FC<ExpenseProps> = ({
  expense,
  handleExpenseChange,
  handleDeleteExpense,
}) => {
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    const updatedExpense: ExpenseType = {
      ...expense,
      date: newDate,
    };
    handleExpenseChange(updatedExpense);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newCostCategory = event.target.value;
    const newCostCode =
      categories.find((item) => item.category === newCostCategory)?.costCode ||
      "";

    const updatedExpense: ExpenseType = {
// The following dictionary connect the string parameter to its corresponding component, based on the selectedCategory. The keys are strings, and the strings with spaces require double quotes
const CATEGORY_COMPONENT_MAP: {
  [key: string]: React.FC<{ onUpdate: (updatedData: any) => void }>;
} = {
  "62-1011-TRV - Reimbursable Gas": ReimbursableGas,
  "62-1006-MLJ - Client Entertainment": Description,
  "62-1005-MLJ - Per Diem": PerDiem,
  Mileage: Mileage,
  Other: Description,
  "Job Site Material": Description,
};

const Expense: React.FC<ExpenseProps> = ({ expense, updateExpense }) => {
  const [selectedDate, setSelectedDate] = useState<string>(expense.date);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    expense.costCategory
  );
  const [costCode, setCostCode] = useState<string>(expense.costCode);
  const [cost, setCost] = useState<string>(expense.cost?.toString() || "0");
  const [attachments, setAttachments] = useState<AttachmentType[]>(
    //expense.attachments || []
    expense.attachments?.map((att) => ({
      ...att,
      text: att.text || selectedDate, // Ensure text is set to selectedDate if it's undefined
    })) || []
  );

  useEffect(() => {
    updateExpense({
      ...expense,
      costCode: newCostCode,
      costCategory: newCostCategory,
    };
    handleExpenseChange(updatedExpense);
  };

  const handleCostCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(`Cost code changed ${event.target.value}`);
    const updatedExpense: ExpenseType = {
      ...expense,
      costCode: event.target.value,
    };
    handleExpenseChange(updatedExpense);
  };

  const handleCostChange = (event: ChangeEvent<HTMLInputElement>) => {
    const cost = Number(event.target.value);
    const updatedExpense: ExpenseType = {
      ...expense,
      cost: cost,
    };
    handleExpenseChange(updatedExpense);
  };

  const requiresCostCode = () => {
    return categories.some(
      (item) => item.category === expense.costCategory && item.costCode === ""
    );
  };

  const showCostInput = () => {
    return (
      expense.costCategory &&
      expense.costCategory !== "Mileage" &&
      expense.costCategory !== "Per Diem"
    );
  const renderCostCodeInput = () => (
    <>
      {requiresCostCode() && (
        <div className="flex flex-col space-y-2 items-start">
          <label className="text-gray-600 text-nowrap" htmlFor="costCode">
            Cost Codex
          </label>
          <input
            className="p-2 border-grey-300 border-b-2"
            type="text"
            id="costCode"
            value={costCode}
            onChange={(e) => setCostCode(e.target.value)}
            placeholder="Enter cost code"
          />
        </div>
      )}
    </>
  );

  const renderCostInput = () => (
    <div className="flex flex-col items-start space-y-2">
      <label className="text-gray-600">Cost</label>
      <input
        className="p-2 border-grey-300 border-b-2"
        type="number"
        id="cost"
        value={cost}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value >= 0) {
            setCost(value.toString());
          }
        }}
      />
    </div>
  );

  // Function to handle file upload
  const handleUploadAttachment = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newAttachments = Array.from(files).map((file, index) => ({
        id: uuidv4(), // Use uuid to generate unique ID
        file,
        text:
          "Cost: " +
          (String(selectedCategory) || "N/A") +
          " | Date: " +
          (String(selectedDate) || "N/A"),
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  const handleDeleteAttachment = (id: string) => {
    setAttachments(attachments.filter((attachment) => attachment.id != id));
  };

  return (
    <div className="p-8 bg-white shadow-sm border-gray-100 border-2 rounded-md">
      <div className="w-full flex flex-col space-y-4 items-start">
        <div className="w-full flex flex-col space-y-4">
          {/* Cost Category Dropdown */}
          <div className="flex flex-col items-start space-y-2">
            <label className="text-gray-600 text-nowrap" htmlFor="costCategory">
              Cost Category
            </label>
            <select
              className="p-2 w-full border-grey-300 border-b-2"
              id="costCategory"
              value={expense.costCategory}
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
                className="w-full p-2 border-grey-300 border-b-2"
                type="text"
                id="costCode"
                value={expense.costCode}
                onChange={handleCostCodeChange}
                placeholder="Enter cost code"
              />
            </div>
          )}

          {/* Date Picker */}
          <div className="flex flex-col items-start space-y-2">
            <label className="text-gray-600" htmlFor="date">
              Date
            </label>
            <input
              className="p-2 w-full border-grey-300 border-b-2"
              type="date"
              id="date"
              value={expense.date}
              onChange={handleDateChange}
            />
          </div>

          {/* Conditional Rendering for Expense Type */}
          {expense.costCategory === "Reimbursable Gas" && (
            <ReimbursableGas
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}
          {expense.costCategory === "Client Entertainment" && (
            <Description
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}
          {expense.costCategory === "Per Diem" && (
            <PerDiem
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}
          {expense.costCategory === "Job Site Material" && (
            <Description
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}
          {expense.costCategory === "Mileage" && (
            <Mileage
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}
          {expense.costCategory === "Other" && (
            <Description
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}

          {/* Conditional Rendering for Cost Input */}
          {showCostInput() && (
            <div className="flex flex-col items-start space-y-2">
              <label className="text-gray-600">Cost</label>
              <input
                className="w-full p-2 border-grey-300 border-b-2"
                type="number"
                id="cost"
                value={expense.cost}
                onChange={handleCostChange}
              />
            </div>
          )}

          <Attachments
            expense={expense}
            handleExpenseChange={handleExpenseChange}
          />
          <div className="flex w-full justify-start">
            <button
              className="text-red-500 text-nowrap transform transition-transform duration-300 ease-in-out hover:scale-105"
              type="button"
              onClick={() => handleDeleteExpense(expense.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
