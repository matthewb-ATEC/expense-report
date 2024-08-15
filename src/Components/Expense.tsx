import React, { ChangeEvent } from "react";

interface Expense {
  // Define any props you expect to pass to this component
  expenseId: number;
  projectId: number;
  onFileUpload: (projectId: number, expenseId: number, files: File[]) => void;
}

const Expense: React.FC<Expense> = ({ expenseId, projectId, onFileUpload }) => {
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
      {/*Conditional Display for required cost codes <div>Cost Code</div>*/}
      {/*Conditionally display ,Purpose, to, from, milage */}
      {/* conditionally display if not milage <div>Amount</div>*/}
    </>
  );
};

export default Expense;
