import React from 'react';
import Expense from './Expense';

interface Project {
  // Define any props you expect to pass to this component
}

const Project: React.FC<Project> = (props) => {  
    
    const expenses = [
        {id:0},
        {id:1},
        {id:2},
        {id:3},
        {id:4},
        {id:5}
    ]

    return (
    <>
      <div>Project Number</div>
      <div>Project Name</div>
      
      {expenses.map((expense) => (
        <div key={expense.id}>
          <Expense />
        </div>
      ))}
    </>
  );
};

export default Project;
