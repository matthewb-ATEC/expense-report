import React, { ChangeEvent } from "react";
import {
  ExpenseType,
} from "../data/types";
import { v4 as uuidv4 } from "uuid";
import Attachment from "./Attachment";

interface AttachmentsProps {
  expense: ExpenseType;
  handleExpenseChange: Function;
}

const Attachments: React.FC<AttachmentsProps> = ({ expense, handleExpenseChange }) => {
  const handleAddAttachment = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) {
        console.log("No files")
        return;
    }

    const newAttachments = Array.from(files).map((file) => ({
        id: uuidv4(),
        file,
    }));

    const updatedExpense: ExpenseType = {
        ...expense,
        attachments: expense.attachments?.concat(newAttachments)
    }
    handleExpenseChange(updatedExpense);
  };

  const handleDeleteAttachment = (id: string) => {
    const updatedExpense: ExpenseType = {
        ...expense,
        attachments: expense.attachments?.filter((attachment) => attachment.id !== id)
    }
    handleExpenseChange(updatedExpense);
  };

  return (
    <>
        {/* File Upload */}
        <input
          type="file"
          multiple
          accept=".pdf, .png, .jpg, .jpeg"
          onChange={handleAddAttachment}
        />

        {/* List of Attachments */}
        <div className="flex">
          {expense.attachments?.map((attachment) => (
            <div key={attachment.id}>
                <Attachment attachment={attachment}/>
                <button
                    className="p-2 text-red-500 font-bold"
                    onClick={() => handleDeleteAttachment(attachment.id)}
                >
                    Delete
                </button>
            </div>
          ))}
        </div>
      </>
  );
};

export default Attachments;
