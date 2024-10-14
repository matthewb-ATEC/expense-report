/* eslint-disable react/prop-types */
import { useState } from "react";
import { ProjectDropdownType } from "../../data/types";

interface ProjectDropdownProps {
  project: ProjectDropdownType;
  isAdmin: boolean;
  onChange: (updatedProject: ProjectDropdownType) => void;
  handleDeleteProject: (projectToDelete: ProjectDropdownType) => void;
}

const ConfigurableProject: React.FC<ProjectDropdownProps> = ({
  project,
  isAdmin,
  onChange,
  handleDeleteProject,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newProject, setNewProject] = useState<ProjectDropdownType>(project);

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedProject: ProjectDropdownType = {
      ...newProject,
      number: Number(event.target.value),
    };
    setNewProject(updatedProject);
    onChange(updatedProject);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedProject: ProjectDropdownType = {
      ...newProject,
      name: event.target.value,
    };
    setNewProject(updatedProject);
    onChange(updatedProject);
  };

  if (isEditing)
    return (
      <div className="w-full flex space-x-4 items-start">
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 text-nowrap" htmlFor="number">
            Number
          </label>
          <input
            className="w-16 p-2 border-grey-300 border-b-2"
            type="text"
            value={newProject.number}
            onChange={handleNumberChange}
          />
        </div>
        <div className="w-full flex flex-col space-y-2">
          <label className="text-gray-600 text-nowrap" htmlFor="name">
            Name
          </label>
          <input
            className="p-2 w-full border-grey-300 border-b-2"
            type="text"
            value={newProject.name}
            onChange={handleNameChange}
          />
        </div>
        <div className="h-full flex flex-col justify-between">
          <button
            className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            Close
          </button>
          <button
            className="text-red-500 transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              handleDeleteProject(project);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );

  return (
    <div className="w-full flex justify-between space-x-4 items-start">
      <div>
        {newProject.number} - {newProject.name}
      </div>
      {isAdmin && (
        <div className="flex space-x-4">
          <button
            className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ConfigurableProject;
