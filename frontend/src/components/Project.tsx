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

import React, { useCallback, useState } from 'react'
import { debounce } from 'lodash'
import { ProjectDropdownType, ProjectType } from '../data/types'

interface ProjectProps {
  project: ProjectType
  selectedProject: ProjectType | null
  filteredProjects: { name: string; number: number }[]
  handleProjectChange: (updatedProject: ProjectType) => void
  handleDeleteProject: (id: string) => void
  handleSelectedProjectChange: (newSelectedProject: ProjectType) => void
  allProjects: ProjectDropdownType[]
}

const Project: React.FC<ProjectProps> = ({
  project,
  selectedProject,
  filteredProjects,
  handleProjectChange,
  handleDeleteProject,
  handleSelectedProjectChange,
  allProjects,
}) => {
  const [description, setDescription] = useState<string>('')
  const projectsThatRequireDescription = ['Sales/Proposals', 'Warranty']

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newName: string = event.target.value
    const newNumber: number | undefined = allProjects.find(
      (project) => project.name === newName
    )?.number

    const updatedProject: ProjectType = {
      ...project,
      number: newNumber,
      name: newName,
    }

    handleProjectChange(updatedProject)
  }

  // Use lodash debounce to delay the state update function
  const debouncedUpdate = useCallback(
    debounce((updatedDescription: string) => {
      const updatedProject: ProjectType = {
        ...project,
        description: updatedDescription,
      }

      handleProjectChange(updatedProject)
    }, 300),
    [project, handleProjectChange]
  )

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value) // Update local state immediately
    debouncedUpdate(event.target.value) // Update parent state after debounce
  }

  const getMinimizedProjectText = () => {
    return project.name === 'Sales/Proposals'
      ? !project.description || project.description === ''
        ? 'No description'
        : project.description
      : project.name === ''
      ? 'Project unassigned'
      : project.name
  }

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
              {project.name && (
                <option value={project.name}>
                  {`${project.number} - ${project.name}`}
                </option>
              )}
              {filteredProjects.map((project) => (
                <option key={project.name} value={project.name}>
                  {`${project.number} - ${project.name}`}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-start space-y-2">
            {projectsThatRequireDescription.includes(project.name) && (
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
                  value={description}
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
                handleDeleteProject(project.id)
              }}
            >
              Delete
            </button>
            {project.name !== '' && (
              <button
                onClick={() => {
                  handleSelectedProjectChange(project)
                }}
                className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105"
              >
                Details
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full items-start p-8 bg-white shadow-md border-gray-100 border-2 rounded-md">
      <div className="flex w-full justify-between space-x-2">
        <div className="text-gray-600">{getMinimizedProjectText()}</div>
        <button
          onClick={() => {
            handleSelectedProjectChange(project)
          }}
          className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105"
        >
          Details
        </button>
      </div>
    </div>
  )
}

export default Project
