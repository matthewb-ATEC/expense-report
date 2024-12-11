/* eslint-disable react/prop-types */
import { useState } from 'react'
import { ProjectDropdownType } from '../../data/types'
import { Header, Text } from '../Text'

interface ProjectDropdownProps {
  project: ProjectDropdownType
  isAdmin: boolean
  onChange: (updatedProject: ProjectDropdownType) => void
  handleDeleteProject: (projectToDelete: ProjectDropdownType) => void
}

const ConfigurableProject: React.FC<ProjectDropdownProps> = ({
  project,
  isAdmin,
  onChange,
  handleDeleteProject,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newProject, setNewProject] = useState<ProjectDropdownType>(project)

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedProject: ProjectDropdownType = {
      ...newProject,
      number: Number(event.target.value),
    }
    setNewProject(updatedProject)
    onChange(updatedProject)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedProject: ProjectDropdownType = {
      ...newProject,
      name: event.target.value,
    }
    setNewProject(updatedProject)
    onChange(updatedProject)
  }

  if (isEditing)
    return (
      <div className="w-full grid grid-cols-[1fr_2fr_1fr] gap-x-4">
        <Header text="Number" />
        <Header className="col-span-2" text="Project" />
        <input
          className="py-2 border-grey-300 border-b-2"
          type="text"
          value={newProject.number === 0 ? undefined : newProject.number}
          onChange={handleNumberChange}
        />
        <input
          className="py-2 border-grey-300 border-b-2"
          type="text"
          value={newProject.name}
          onChange={handleNameChange}
        />
        <div className="flex space-x-4 place-self-end">
          <button
            className="text-red-500 transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              handleDeleteProject(project)
            }}
          >
            Delete
          </button>
          <button
            className="text-atec transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              setIsEditing(!isEditing)
            }}
          >
            Close
          </button>
        </div>
      </div>
    )

  return (
    <div className="w-full flex justify-between space-x-4 items-start">
      <Text text={`${newProject.number} - ${newProject.name}`} />
      {isAdmin && (
        <div className="flex space-x-4">
          <button
            className="text-atec transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              setIsEditing(!isEditing)
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  )
}

export default ConfigurableProject
