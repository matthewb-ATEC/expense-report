/**
 * @file Name.tsx - ./frontend/src/components
 * @description The `Name` component is a functional React component that renders an input field for users to enter their full name. It utilizes a prop function `setName` to update the parent component's state whenever the input value changes. This component enhances form usability by providing clear labeling and structured styling.
 * @author matthewb
 * @date Created: 2024-09-30 | Last Modified: 2024-09-30
 * @version 1.0.0
 * @license MIT
 * @usage The `Name` component should be used within a form or user input section where capturing the user's full name is required. It requires a `setName` function as a prop to handle updates to the name state in the parent component. Example usage:
 *        `<Name setName={setNameFunction} />`
 * @dependencies
 *  - React for building the component.
 * @relatedFiles Related components may include other input components or forms that gather user information, such as `Email.tsx` or `Address.tsx`.
 */

import React, { ChangeEvent, useCallback, useState } from 'react'
import { debounce } from 'lodash'
import { ReportType, UserType } from '../data/types'

interface NameProps {
  report: ReportType
  handleReportChange: (updatedReport: ReportType) => void
}

const Name: React.FC<NameProps> = ({ report, handleReportChange }) => {
  const [name, setName] = useState(report.user.name)

  // Use lodash debounce to delay the state update function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce((updatedName: string) => {
      const updatedUser: UserType = {
        ...report.user,
        name: updatedName,
      }

      const updatedReport: ReportType = {
        ...report,
        user: updatedUser,
      }

      handleReportChange(updatedReport)
    }, 300),
    [report, handleReportChange]
  )

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value) // Update local state immediately
    debouncedUpdate(event.target.value) // Update parent state after debounce
  }

  const handleNameInput = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value) // This ensures the state is updated on input events
    debouncedUpdate(event.currentTarget.value) // Update parent state after debounce
  }

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="text-xl font-semibold">User Information</div>
      <div className="p-8 bg-white border-gray-100 border-2 rounded-md shadow-md">
        <div className="flex flex-col w-full items-start space-y-2">
          <input
            className="p-2 w-full border-grey-300 border-b-2"
            type="text"
            id="name"
            placeholder="Full name"
            name="name"
            value={name}
            onChange={handleNameChange}
            onInput={handleNameInput}
          />
        </div>
      </div>
    </div>
  )
}

export default Name
