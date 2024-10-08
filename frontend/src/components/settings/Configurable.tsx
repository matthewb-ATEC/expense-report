/**
 * @file Configurable.tsx - ./frontend/src/components
 * @description The `Configurable` component provides a user interface for displaying and editing a numeric value. It allows admin users to switch between view and edit modes, enabling them to modify the value as needed. The component manages its internal state to reflect changes and triggers a callback function (`onChange`) whenever the value is updated. This component is useful in scenarios where configurable settings or parameters need to be displayed and modified by authorized users.
 * @author matthewb
 * @date Created: 2024-10-01 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage Use this component to create editable fields for admin users. For example:
 *        `<Configurable name="Setting Name" value={currentValue} isAdmin={isAdminUser} onChange={handleValueChange} />`
 *        Where `name` is the label of the setting, `value` is the current value to display, `isAdmin` determines edit permissions, and `onChange` is the function to handle value updates.
 * @dependencies React for managing state and handling user interactions.
 * @relatedFiles This component may be related to other settings or configuration components, such as `SettingsForm.tsx`.
 */

/* eslint-disable react/prop-types */
import { useState } from "react";

interface ConfigurableProps {
  name: string;
  value: number;
  isAdmin: boolean;
  onChange: (newValue: number) => void;
}

const Configurable: React.FC<ConfigurableProps> = ({
  name,
  value,
  isAdmin,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(String(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("New value", e.target.value);
    const value = parseFloat(e.target.value);
    setNewValue(e.target.value);
    onChange(value);
  };

  if (isEditing)
    return (
      <div className="w-full flex flex-col space-y-2 items-start">
        <div className="w-full flex justify-between">
          <label className="text-gray-600 text-nowrap" htmlFor={name}>
            {name}
          </label>
          <button
            className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            Close
          </button>
        </div>
        <input
          className="p-2 w-full border-grey-300 border-b-2"
          type="text"
          value={newValue}
          onChange={handleChange}
        />
      </div>
    );

  return (
    <div className="w-full flex space-x-12 justify-between">
      <div className="text-gray-600 text-nowrap">{name}</div>
      <div className="flex space-x-2">
        <div>${newValue}</div>
        {isAdmin && (
          <button
            className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Configurable;
