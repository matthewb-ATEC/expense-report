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
import { useState } from 'react'
import { Header, Text } from '../Text'

interface ConfigurableProps {
  name: string
  value: number
  isAdmin: boolean
  onChange: (newValue: number) => void
}

const Configurable: React.FC<ConfigurableProps> = ({
  name,
  value,
  isAdmin,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newValue, setNewValue] = useState<string>(String(value))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setNewValue(e.target.value)
    onChange(value)
  }

  if (isEditing)
    return (
      <div className="w-full flex space-x-4 items-center ">
        <Header className="text-nowrap" text={name} />
        <input
          className="py-2 w-full border-grey-300 border-b-2"
          type="text"
          value={newValue}
          onChange={handleChange}
        />

        <button
          className="text-atec justify-self-end transform transition-transform duration-300 ease-in-out hover:scale-105"
          onClick={() => {
            setIsEditing(!isEditing)
          }}
        >
          Close
        </button>
      </div>
    )

  return (
    <div className="w-full flex space-x-12 justify-between">
      <Text text={name} />
      <div className="flex space-x-4">
        <Text className="text-text-primary" text={`$${newValue}`} />
        {isAdmin && (
          <button
            className="text-atec transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              setIsEditing(!isEditing)
            }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

export default Configurable
