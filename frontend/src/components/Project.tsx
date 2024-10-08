/**
 * @file Project.tsx - ./frontend/src/components
 * @description A component that manages project details, allowing selection, editing, and deletion of projects.
 * @author matthewb
 * @date Created: 2024-09-30 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage This component is used to display and manage project information in the application.
 *        It allows users to select a project, update its details, and delete it from the list.
 * @dependencies
 *  - react: ^18.0.0 // React library for building user interfaces
 * @relatedFiles
 *  - types.ts: ../data/types // Type definitions for the project data
 *  - projects.ts: ../data/projects // Contains all project data
 */

import React from "react";
import { ProjectDropdownType, ProjectType } from "../data/types";

interface ProjectProps {
  project: ProjectType;
  selectedProject: ProjectType | null;
  filteredProjects: { name: string; number: number }[];
  handleProjectChange: (updatedProject: ProjectType) => void;
  handleDeleteProject: (id: string) => void;
  updateSelectedProject: (project: ProjectType) => void;
  allProjects: ProjectDropdownType[];
}

const Project: React.FC<ProjectProps> = ({
  project,
  selectedProject,
  filteredProjects,
  handleProjectChange,
  handleDeleteProject,
  updateSelectedProject,
  allProjects,
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

  if (selectedProject && project.id === selectedProject.id) {
    return (
      <div className="flex w-full items-start p-8 bg-white shadow-md border-gray-100 border-2 rounded-md">
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
                <option value={project.name}>
                  {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions*/}
                  {`${project.number} - ${project.name}`}
                </option>
              )}
              {filteredProjects.map((project) => (
                <option key={project.name} value={project.name}>
                  {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions*/}
                  {`${project.number} - ${project.name}`}
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
    <div className="flex w-full items-start p-8 bg-white shadow-md border-gray-100 border-2 rounded-md">
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
