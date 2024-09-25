import React from "react";
import { ProjectType } from "../data/types";
import { allProjects } from "../data/projects";

interface ProjectProps {
  project: ProjectType;
  handleProjectChange: Function;
  handleDeleteProject: Function;
  handleSelectedProjectChange: Function;
}

const Project: React.FC<ProjectProps> = ({
  project,
  handleProjectChange,
  handleDeleteProject,
  handleSelectedProjectChange,
}) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newName: string = event.target.value;
    const newNumber: number | undefined = allProjects.find(
      (project) => project.name === newName
    )?.number;

    const updatedProject: ProjectType = {
      ...project,
      number: newNumber,
      name: newName,
    };

    handleProjectChange(updatedProject);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedProject: ProjectType = {
      ...project,
      description: event.target.value,
    };

    handleProjectChange(updatedProject);
  };

  return (
    <div className="flex items-start p-8 bg-white shadow-sm border-gray-100 border-2 rounded-md">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col items-start space-y-2">
            <label className="text-gray-600 text-nowrap" htmlFor="projectName">
              Project
            </label>
            <select
              className="p-2 w-full border-grey-300 border-b-2"
              id="projectName"
              value={project.name}
              onChange={handleNameChange}
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
                  value={project.description}
                  onChange={handleDescriptionChange}
                />
              </>
            )}
            <div className="w-full flex justify-between">
              <button
                className="text-red-500 text-nowrap"
                type="button"
                onClick={() => handleDeleteProject(project.id)}
              >
                Delete
              </button>
              <button onClick={() => handleSelectedProjectChange(project)}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
