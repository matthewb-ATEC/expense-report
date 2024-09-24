import React from "react";
import { ExpenseType } from "../data/types";
import { v4 as uuidv4 } from "uuid";
import { ProjectType} from "../data/types";
import { allProjects } from "../data/projects";
import projectsService from "../services/projectsService";
import Expenses from "./Expenses";

interface ProjectProps {
  project: ProjectType;
  handleProjectChange: Function;
  handleDeleteProject: Function;
}

const Project: React.FC<ProjectProps> = ({
  project,
  handleProjectChange,
  handleDeleteProject
}) => {
  const handleAddExpense = () => {
    const newExpense: ExpenseType = {
      id: uuidv4(),
      date: "",
      costCategory: "",
      costCode: "",
    };

    const updatedProject = {
      ...project,
      expenses: project.expenses.concat(newExpense)
    }
    
    handleProjectChange(updatedProject);
  };

  const handleSelectedProjectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newName: string = event.target.value;
    const newNumber: number | undefined = allProjects.find((project) => 
      project.name === newName)?.number

    const updatedProject: ProjectType = {
      ...project,
      number: newNumber,
      name: newName
    }

    handleProjectChange(updatedProject)
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedProject: ProjectType = {
      ...project,
      description: event.target.value
    }
    
    handleProjectChange(updatedProject)
  };

  const handleExpensesChange = (updatedExpenses: ExpenseType[]) => {
    const updatedProject: ProjectType = {
      ...project,
      expenses: updatedExpenses
    };
    handleProjectChange(updatedProject);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col items-start space-y-2">
          <label className="text-gray-600 text-nowrap" htmlFor="projectName">
            Project
          </label>
          <select
            className="p-2 w-full border-grey-300 border-b-2"
            id="projectName"
            onChange={handleSelectedProjectChange}
          >
            <option value="">Select a project</option>
            {allProjects.map((project) => (
              <option key={project.name} value={project.name}>
                {project.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>

          {project.name === "Other" && (
            <>
              <label
                className="text-gray-600 text-nowrap"
                htmlFor="description"
              >
                Description
              </label>
              <input
                className="p-2 w-full border-grey-300 border-b-2"
                id="description"
                onChange={handleDescriptionChange}
              />
            </>
          )}
        </div>

        <Expenses expenses={project.expenses} handleExpensesChange={handleExpensesChange}/>
      </div>


          <button
            className="text-red-500 font-bold text-nowrap"
            type="button"
            onClick={() => handleDeleteProject(project.id)}
          >
            Delete Project
          </button>

      <button
        className="text-ATECblue font-bold"
        type="button"
        onClick={handleAddExpense}
      >
        Add Expense
      </button>
    </div>
  );
};

export default Project;
