import React, { useEffect, useState } from "react";
import Expense from "./Expense";
import { Expense as ExpenseType } from "../Types";

interface ProjectProps {
  project: any;
  allProjects: { number: number; name: string }[];
  updateProject: (updatedProject: any) => void;
}

const Project: React.FC<ProjectProps> = ({
  project,
  allProjects,
  updateProject,
}) => {
  const [selectedProjectNumber, setSelectedProjectNumber] = useState<
    number | undefined
  >(project.projectNumber);
  const [selectedProjectName, setSelectedProjectName] = useState<
    string | undefined
  >(project.projectName);
  const [expenses, setExpenses] = useState<ExpenseType[]>(project.expenses);

  useEffect(() => {
    updateProject({
      ...project,
      projectNumber: selectedProjectNumber,
      projectName: selectedProjectName,
      expenses,
    });
  }, [selectedProjectNumber, selectedProjectName, expenses]);

  const addExpense = () => {
    const newExpenseId =
      expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 0;
    const newExpense: ExpenseType = {
      id: newExpenseId,
      date: "",
      costCategory: "",
      costCode: "",
    };
    setExpenses([...expenses, newExpense]);
  };

  const removeExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleProjectNumberChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const number = Number(event.target.value);
    setSelectedProjectNumber(number);
    const project = allProjects.find((project) => project.number === number);
    setSelectedProjectName(project ? project.name : "");
  };

  const handleExpenseUpdate = (updatedExpense: any) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
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

      <div>Project Name: {selectedProjectName}</div>

      {expenses.map((expense) => (
        <div key={expense.id}>
          <Expense expense={expense} updateExpense={handleExpenseUpdate} />
          <div>Expense ID: {expense.id}</div>
          <button type="button" onClick={() => removeExpense(expense.id)}>
            Remove Expense
          </button>
        </div>
      ))}

      <button type="button" onClick={addExpense}>
        Add Expense
      </button>
    </>
  );
};

export default Project;
