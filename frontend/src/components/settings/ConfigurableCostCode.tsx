/* eslint-disable react/prop-types */
import { useState } from 'react'
import { CostCodeDropdownType } from '../../data/types'
import { Header, Text } from '../Text'

interface ConfigurableCostCodeProps {
  costCode: CostCodeDropdownType
  isAdmin: boolean
  onChange: (updatedCostCode: CostCodeDropdownType) => void
  handleDeleteCostCode: (costCodeToDelete: CostCodeDropdownType) => void
}

const ConfigurableCostCode: React.FC<ConfigurableCostCodeProps> = ({
  costCode,
  isAdmin,
  onChange,
  handleDeleteCostCode,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newCostCode, setNewCostCode] = useState<CostCodeDropdownType>(costCode)

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCostCode: CostCodeDropdownType = {
      ...newCostCode,
      costCode: event.target.value,
    }
    setNewCostCode(updatedCostCode)
    onChange(updatedCostCode)
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCostCode: CostCodeDropdownType = {
      ...newCostCode,
      category: event.target.value,
    }
    setNewCostCode(updatedCostCode)
    onChange(updatedCostCode)
  }

  if (isEditing)
    return (
      <div className="w-full grid grid-cols-[1fr_2fr_1fr] gap-x-4">
        <Header text="Cost code" />
        <Header className="col-span-2" text="Category" />
        <input
          className="py-2 border-grey-300 border-b-2"
          type="text"
          value={newCostCode.costCode}
          onChange={handleCodeChange}
        />
        <input
          className="py-2 border-grey-300 border-b-2"
          type="text"
          value={newCostCode.category}
          onChange={handleCategoryChange}
        />
        <div className="flex space-x-4 place-self-end">
          <button
            className="text-red-500 place-self-end transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              handleDeleteCostCode(newCostCode)
            }}
          >
            Delete
          </button>
          <button
            className="text-atec place-self-end transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              setIsEditing(!isEditing)
            }}
          >
            Close
          </button>
        </div>
      </div>
    )

  return (
    <div className="w-full flex justify-between space-x-4 items-start">
      <Text text={`${newCostCode.costCode} ${newCostCode.category}`} />
      {isAdmin && (
        <div className="flex space-x-4">
          <button
            className="text-atec transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              setIsEditing(!isEditing)
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  )
}

export default ConfigurableCostCode
