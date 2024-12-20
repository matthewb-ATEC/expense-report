/**
 * @file Expense.tsx - ./frontend/src/components
 * @description The `Expense` component manages the rendering and editing of an individual expense item within an expense tracking application. It allows users to select categories, input costs, dates, and add attachments while dynamically displaying additional fields based on the selected category.
 * @author matthewb
 * @date Created: 2024-09-30 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage This component is designed to be used within a larger expense management application. It should be instantiated with the necessary `expense` data and handler functions for updating and deleting expenses. Example usage:
 *        `<Expense expense={expenseData} handleExpenseChange={updateExpense} handleDeleteExpense={deleteExpense} />`
 * @dependencies React for component structure, ChangeEvent for type safety on events, and any external components like `Description`, `PerDiem`, `Mileage`, and `Attachments` for specialized functionality.
 * @relatedFiles This component is related to `Attachments.tsx`, `Description.tsx`, `PerDiem.tsx`, and `Mileage.tsx`, which provide additional functionality for specific expense types.
 */

import { ChangeEvent, FC } from 'react'
import Description from './expenses/Description'
import PerDiem from './expenses/PerDiem'
import Mileage from './expenses/Mileage'
import { CostCodeDropdownType, ExpenseType } from '../data/types'
import Attachments from './Attachments'

interface ExpenseProps {
  expense: ExpenseType
  costCodes: CostCodeDropdownType[]
  handleExpenseChange: (updatedExpense: ExpenseType) => void
  handleDeleteExpense: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => void
}

const Expense: FC<ExpenseProps> = ({
  expense,
  costCodes,
  handleExpenseChange,
  handleDeleteExpense,
}) => {
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value
    const updatedExpense: ExpenseType = {
      ...expense,
      date: newDate,
    }
    handleExpenseChange(updatedExpense)
  }

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newCostCategory = event.target.value
    const newCostCode =
      costCodes.find((costCode) => costCode.category === newCostCategory)
        ?.costCode ?? ''

    const updatedExpense: ExpenseType = {
      ...expense,
      costCategory: newCostCategory,
      costCode: newCostCode,
    }
    handleExpenseChange(updatedExpense)
  }

  const handleCostChange = (event: ChangeEvent<HTMLInputElement>) => {
    const cost = Number(event.target.value)
    const updatedExpense: ExpenseType = {
      ...expense,
      cost: cost,
    }
    handleExpenseChange(updatedExpense)
  }

  const showCostInput = () => {
    return (
      expense.costCategory &&
      expense.costCategory !== 'Mileage' &&
      expense.costCategory !== 'Per Diem'
    )
  }

  const renderCostInput = () => (
    <>
      {showCostInput() && (
        <div className="w-full flex flex-col items-start space-y-2">
          <label className="text-gray-600">Cost</label>
          <input
            className="w-full p-2 border-grey-300 border-b-2"
            type="number"
            id="cost"
            placeholder="$"
            value={
              expense.cost !== undefined && expense.cost !== 0
                ? expense.cost
                : ''
            }
            onChange={handleCostChange}
          />
        </div>
      )}
    </>
  )

  return (
    <div className="p-8 bg-white shadow-md border-gray-100 border-2 rounded-md">
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
              {costCodes.map((costCode, index) => (
                <option key={index} value={costCode.category}>
                  {costCode.category}
                </option>
              ))}
            </select>
          </div>

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
          {expense.costCategory === 'Client Entertainment' && (
            <Description
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}
          {expense.costCategory === 'Per Diem' && (
            <PerDiem
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}
          {expense.costCategory === 'Job Site Material' && (
            <Description
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}
          {expense.costCategory === 'Mileage' && (
            <Mileage
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}
          {expense.costCategory === 'Wellness' && (
            <Description
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}
          {expense.costCategory === 'Company Events' && (
            <Description
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}
          {expense.costCategory === 'Relocation' && (
            <Description
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}
          {expense.costCategory === 'Training' && (
            <Description
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}
          {expense.costCategory === 'Office Expense' && (
            <Description
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}
          {expense.costCategory === 'Technology' && (
            <Description
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}
          {expense.costCategory === 'Other' && (
            <Description
              expense={expense}
              handleExpenseChange={handleExpenseChange}
            />
          )}

          {/* Conditional Rendering for Cost Input */}
          {renderCostInput()}

          <Attachments
            expense={expense}
            handleExpenseChange={handleExpenseChange}
          />
          <div className="flex w-full justify-start">
            <button
              className="text-red-500 text-nowrap transform transition-transform duration-300 ease-in-out hover:scale-105"
              type="button"
              onClick={(event) => {
                handleDeleteExpense(event, expense.id)
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Expense
