import React from 'react';

interface Expense {
  // Define any props you expect to pass to this component
}

const Expense: React.FC<Expense> = (props) => {
  return (
    <>
      <div>Date</div>
      <div>Cost Category</div>
      {/*Conditional Display for required cost codes <div>Cost Code</div>*/}
      {/*Conditionally display ,Purpose, to, from, milage */}
      {/* conditionally display if not milage <div>Amount</div>*/}
    </>
  );
};

export default Expense;
