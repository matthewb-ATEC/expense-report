import React, { useEffect, useState } from "react";
import Expense from "./Expense";
import { Expense as ExpenseType } from "../Data/types";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

interface ProjectProps {
  project: any;
  allProjects: { number: string }[];
  updateProject: (updatedProject: any) => void;
}

const Project: React.FC<ProjectProps> = ({
  project,
  allProjects,
  updateProject,
}) => {
  const [selectedProjectNumber, setSelectedProjectNumber] = useState<
    string | undefined
  >(project.projectNumber);
  const [projectDescription, setProjectDescription] = useState<
    string | undefined
  >(project.projectDescription);
  const [expenses, setExpenses] = useState<ExpenseType[]>(project.expenses);

  useEffect(() => {
    updateProject({
      ...project,
      projectNumber: selectedProjectNumber,
      projectDescription: projectDescription,
      expenses,
    });
  }, [selectedProjectNumber, projectDescription, expenses]);

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
    const number = event.target.value;
    setSelectedProjectNumber(number);
  };

  const handleProjectDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedProjectDescription = e.target.value;
    setProjectDescription(updatedProjectDescription);
    updateProject(updatedProjectDescription);
  };

  const handleExpenseUpdate = (updatedExpense: any) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col items-start space-y-2">
          <label className="text-gray-600 text-nowrap" htmlFor="projectNumber">
            Project
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
            <option value="Other">Other</option>
          </select>

          {selectedProjectNumber == "Other" && (
            <>
              <label
                className="text-gray-600 text-nowrap"
                htmlFor="projectDescription"
              >
                Project Description
              </label>
              <input
                className="p-2 w-full border-grey-300 border-b-2"
                id="projectDescription"
                value={projectDescription || ""}
                onChange={handleProjectDescriptionChange}
              />
            </>
          )}
        </div>

        {expenses.map((expense) => (
          <div className="flex space-x-4 items-start" key={expense.id}>
            <Expense expense={expense} updateExpense={handleExpenseUpdate} />
            <button
              className="text-red-500 text-nowrap font-bold"
              type="button"
              onClick={() => removeExpense(expense.id)}
            >
              <FontAwesomeIcon icon={faMinus} />
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
