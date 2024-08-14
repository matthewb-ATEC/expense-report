import React from 'react';

interface ExpenseFormProps {
  // Define any props you expect to pass to this component
}

const ExpenseForm: React.FC<ExpenseFormProps> = (props) => {
  // You can define any state or handlers here

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields go here */}
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" name="amount" />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
