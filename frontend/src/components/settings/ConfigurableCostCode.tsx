/* eslint-disable react/prop-types */
import { useState } from "react";
import { CostCodeDropdownType } from "../../data/types";

interface ConfigurableCostCodeProps {
  costCode: CostCodeDropdownType;
  isAdmin: boolean;
  onChange: (updatedCostCode: CostCodeDropdownType) => void;
  handleDeleteCostCode: (costCodeToDelete: CostCodeDropdownType) => void;
}

const ConfigurableCostCode: React.FC<ConfigurableCostCodeProps> = ({
  costCode,
  isAdmin,
  onChange,
  handleDeleteCostCode,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newCostCode, setNewCostCode] =
    useState<CostCodeDropdownType>(costCode);

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCostCode: CostCodeDropdownType = {
      ...newCostCode,
      costCode: event.target.value,
    };
    setNewCostCode(updatedCostCode);
    onChange(updatedCostCode);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCostCode: CostCodeDropdownType = {
      ...newCostCode,
      category: event.target.value,
    };
    setNewCostCode(updatedCostCode);
    onChange(updatedCostCode);
  };

  if (isEditing)
    return (
      <div className="w-full flex space-x-4 items-start">
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 text-nowrap" htmlFor="number">
            Cost Code
          </label>
          <input
            className="w-16 p-2 border-grey-300 border-b-2"
            type="text"
            value={newCostCode.costCode}
            onChange={handleCodeChange}
          />
        </div>
        <div className="w-full flex flex-col space-y-2">
          <label className="text-gray-600 text-nowrap" htmlFor="name">
            Category
          </label>
          <input
            className="p-2 w-full border-grey-300 border-b-2"
            type="text"
            value={newCostCode.category}
            onChange={handleCategoryChange}
          />
        </div>
        <div className="h-full flex flex-col justify-between">
          <button
            className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            Close
          </button>
          <button
            className="text-red-500 transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              handleDeleteCostCode(newCostCode);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );

  return (
    <div className="w-full flex justify-between space-x-4 items-start">
      <div>
        {newCostCode.costCode} {newCostCode.category}
      </div>
      {isAdmin && (
        <div className="flex space-x-4">
          <button
            className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ConfigurableCostCode;
