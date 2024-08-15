import React, { useState } from "react";
import Expense from "./Expense";

interface ProjectProps {
  allProjects: { number: number; name: string }[];
  onFileUpload: (projectId: number, expenseId: number, files: File[]) => void;
}

const Project: React.FC<ProjectProps> = ({ allProjects, onFileUpload }) => {
  // State for the selected project number and name
  const [selectedProjectNumber, setSelectedProjectNumber] = useState<
    number | undefined
  >();
  const [selectedProjectName, setSelectedProjectName] = useState<
    string | undefined
  >();

  // The list of all expenses created by the user for this project
  const [expenses, setExpenses] = useState([{ id: 0 }]);

  // Adds a new default expense to the list of expenses for this project
  const addExpense = () => {
    const newExpense = { id: expenses[expenses.length - 1].id + 1 }; // Simple ID generation based on length
    setExpenses([...expenses, newExpense]);
  };

  // Removes the selected expense from this project
  const removeExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Update the project name and notify Home component based on selected project number
  const handleProjectNumberChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const number = Number(event.target.value);
    setSelectedProjectNumber(number);

    const project = allProjects.find((project) => project.number === number);
    setSelectedProjectName(project ? project.name : "");
  };

  return (
    <>
      <div>
        <label htmlFor="projectNumber">Project Number:</label>
        <select
          id="projectNumber"
          value={selectedProjectNumber || ""}
          onChange={handleProjectNumberChange}
        >
          <option value="">Select a number</option>
          {allProjects.map((project) => (
            <option key={project.number} value={project.number}>
              {project.number}
            </option>
          ))}
        </select>
      </div>

      <div>{selectedProjectName}</div>

      {expenses.map((expense) => (
        <div key={expense.id}>
          --Expense {expense.id}--
          <Expense
            expenseId={expense.id}
            projectId={selectedProjectNumber || 0}
            onFileUpload={onFileUpload}
          />
          <button type="button" onClick={() => removeExpense(expense.id)}>
            Remove Expense
          </button>
          <br />
          <br />
        </div>
      ))}

      <button type="button" onClick={addExpense}>
        Add Expense
      </button>
    </>
  );
};

export default Project;
