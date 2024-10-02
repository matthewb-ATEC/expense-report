import React from "react";
import { ProjectType } from "../data/types";
import { allProjects } from "../data/projects";

interface ProjectProps {
  project: ProjectType;
  selectedProject: ProjectType | null;
  filteredProjects: string[];
  handleProjectChange: (updatedProject: ProjectType) => void;
  handleDeleteProject: (id: string) => void;
  updateSelectedProject: (project: ProjectType) => void;
}

const Project: React.FC<ProjectProps> = ({
  project,
  selectedProject,
  filteredProjects,
  handleProjectChange,
  handleDeleteProject,
  updateSelectedProject,
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

  const getMinimizedProjectText = () => {
    return project.name === "Other"
      ? !project.description || project.description === ""
        ? "No description"
        : project.description
      : project.name === ""
      ? "Project unassigned"
      : project.name;
  };

  if (project === selectedProject) {
    return (
      <div className="flex w-full items-start p-8 bg-white shadow-sm border-gray-100 border-2 rounded-md">
        <div className="flex w-full flex-col space-y-4">
          <div className="flex w-full flex-col items-start space-y-2">
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
              {project.name && project.name !== "Other" && (
                <option value={project.name}>{project.name}</option>
              )}
              {filteredProjects.map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col items-start space-y-2">
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
          </div>
          <div className="w-full flex justify-between">
            <button
              className="text-red-500 text-nowrap transform transition-transform duration-300 ease-in-out hover:scale-105"
              type="button"
              onClick={() => {
                handleDeleteProject(project.id);
              }}
            >
              Delete
            </button>
            {project.name !== "" && (
              <button
                onClick={() => {
                  updateSelectedProject(project);
                }}
                className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105"
              >
                Details
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full items-start p-8 bg-white shadow-sm border-gray-100 border-2 rounded-md">
      <div className="flex w-full justify-between space-x-2">
        <div className="text-gray-600">{getMinimizedProjectText()}</div>
        <button
          onClick={() => {
            updateSelectedProject(project);
          }}
          className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default Project;
