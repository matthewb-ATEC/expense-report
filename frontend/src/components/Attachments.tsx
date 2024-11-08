/**
 * @file Attachments.tsx - ./frontend/src/components
 * @description The `Attachments` component allows users to upload multiple file attachments related to an expense, such as receipts or documents. It manages the state of the attached files, enabling users to add new attachments and delete existing ones. The component uses the `Attachment` sub-component to render individual attachment details, displaying their file names and providing a delete option for each attachment. This component is particularly useful in expense tracking or reimbursement forms where multiple receipts may be required.
 * @author matthewb
 * @date Created: 2024-09-30 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage Use this component to render an interface for managing expense attachments. For example:
 *        `<Attachments expense={expense} handleExpenseChange={handleExpenseChange} />`
 *        Where `expense` is an object containing expense details and `handleExpenseChange` is a function to update the expense state.
 * @dependencies React, `AttachmentType`, `ExpenseType` from `../data/types`, and `uuid` for generating unique IDs.
 * @relatedFiles This component is often used in conjunction with `ExpenseForm.tsx` or other components that manage expenses and their details.
 */

import React, { ChangeEvent } from 'react'
import { AttachmentType, ExpenseType } from '../data/types'
import Attachment from './Attachment'
import { sessionAttachments } from '../data/results'

interface AttachmentsProps {
  expense: ExpenseType & { attachments?: AttachmentType[] }
  handleExpenseChange: (updatedExpense: ExpenseType) => void
}

const Attachments: React.FC<AttachmentsProps> = ({
  expense,
  handleExpenseChange,
}) => {
  const handleAddAttachment = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files) {
      console.log('No files')
      return
    }

    const newAttachments: AttachmentType[] = Array.from(files).map((file) => ({
      id: expense.date || 'no date',
      file,
      text: Math.random().toString(36).slice(2, 11),
    }))

    sessionAttachments.push(...newAttachments)
    console.log('sessionAttachments after addition:', sessionAttachments)

    const updatedExpense: ExpenseType = {
      ...expense,
      attachments: expense.attachments
        ? [...expense.attachments, ...newAttachments]
        : newAttachments,
    }
    handleExpenseChange(updatedExpense)
  }

  const handleDeleteAttachment = (text: string | undefined) => {
    if (!text) return

    const updatedAttachments = sessionAttachments.filter(
      (attachment) => attachment.text !== text
    )

    sessionAttachments.length = 0 // Clear the array
    sessionAttachments.push(...updatedAttachments) // Add updated attachments

    console.log('sessionAttachments after deletion:', sessionAttachments)

    const updatedExpense: ExpenseType = {
      ...expense,
      attachments: expense.attachments?.filter(
        (attachment) => attachment.text !== text
      ),
    }
    handleExpenseChange(updatedExpense)
  }

  return (
    <>
      {/* File Upload */}
      <div className="flex flex-col items-start space-y-2">
        <label className="text-gray-600 text-nowrap" htmlFor="costCategory">
          Receipts
        </label>
        <input
          type="file"
          multiple
          accept=".pdf, .png, .jpg, .jpeg"
          onChange={handleAddAttachment}
        />
      </div>

      {/* List of Attachments */}
      <div className="flex flex-col space-y-2">
        {expense.attachments?.map((attachment, index) => (
          <div className="w-full flex justify-between items-start" key={index}>
            <Attachment attachment={attachment} />
            <button
              className="text-red-500 text-nowrap transform transition-transform duration-300 ease-in-out hover:scale-105"
              onClick={() => {
                handleDeleteAttachment(attachment.text)
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Attachments
