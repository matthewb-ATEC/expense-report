import React, { useEffect, useState } from "react";
import Expense from "./Expense";
import { Expense as ExpenseType } from "../Data/Types";
import { v4 as uuidv4 } from "uuid";

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
    const newExpense: ExpenseType = {
      id: uuidv4(),
      date: "",
      costCategory: "",
      costCode: "",
    };
    setExpenses([...expenses, newExpense]);
  };

  const removeExpense = (id: string) => {
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
    <div className="w-full flex-col">
      <div className="flex-col space-y-4">
        <div className="flex-col w-full items-start space-y-2">
          <label className="text-gray-600 text-nowrap" htmlFor="projectNumber">
            Project Number
          </label>
          <select
            className="p-2 w-full border-grey-300 border-b-2"
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

        {selectedProjectName && (
          <div className="flex justify-between">
            <label className="text-gray-600 text-nowrap">Project Name </label>
            <div>{selectedProjectName}</div>
          </div>
        )}

        {expenses.map((expense) => (
          <div className="flex space-x-4 items-start" key={expense.id}>
            <Expense expense={expense} updateExpense={handleExpenseUpdate} />
            <button
              className="text-red-500 text-nowrap font-bold"
              type="button"
              onClick={() => removeExpense(expense.id)}
            >
              Remove Expense
            </button>
          </div>
        ))}
      </div>

      <button
        className="text-ATECblue font-bold"
        type="button"
        onClick={addExpense}
      >
        Add Expense
      </button>
    </div>
  );
};

export default Project;
