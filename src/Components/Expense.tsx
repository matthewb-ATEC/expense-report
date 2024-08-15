import React, { ChangeEvent } from "react";

interface Expense {
  // Define any props you expect to pass to this component
  expenseId: number;
  projectId: number;
  onFileUpload: (projectId: number, expenseId: number, files: File[]) => void;
  attachments: { id: string; file: File }[];
  onDeleteAttachment: (attachmentId: string) => void;
}

const Expense: React.FC<Expense> = ({
  expenseId,
  projectId,
  onFileUpload,
  attachments,
  onDeleteAttachment,
}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onFileUpload(projectId, expenseId, Array.from(files));
    }
  };
  return (
    <>
      <div>Date</div>
      <div>Cost Category</div>
      <input type="file" multiple onChange={handleFileChange} />
      <ul>
        {attachments.map((attachment) => (
          <li key={attachment.id}>
            {attachment.file.name}
            <button onClick={() => onDeleteAttachment(attachment.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/*Conditional Display for required cost codes <div>Cost Code</div>*/}
      {/*Conditionally display ,Purpose, to, from, milage */}
      {/* conditionally display if not milage <div>Amount</div>*/}
    </>
  );
};

export default Expense;
