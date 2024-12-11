/**
 * @file Projects.tsx - ./frontend/src/components
 * @description A component that manages and displays a list of projects, allowing users to add, delete, and select projects for further editing.
 * @author matthewb
 * @date Created: 2024-09-30 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage This component is used to render a list of projects and provides functionality to add new projects, delete existing ones, and select a project for editing.
 *        It integrates with a project service for database operations.
 * @dependencies
 *  - react: ^18.0.0 // React library for building user interfaces
 *  - uuid: ^9.0.0 // Library for generating unique identifiers
 *  - ../data/types: ProjectType // Type definition for project data
 *  - ../services/projectsService: projectsService // Service for managing project-related API calls
 * @relatedFiles
 *  - Project.tsx: ./Project // Child component for displaying individual project details
 */

/* eslint-disable react/prop-types */
import { ProjectDropdownType, ProjectType, ReportType } from '../data/types'
import projectsService from '../services/projectsService'
import Button from './Button'
import Project from './Project'
import { Subtitle, Title } from './Text'

interface ProjectsProps {
  report: ReportType
  selectedProject: ProjectType | null
  filteredProjects: { name: string; number: number }[]
  handleProjectsChange: (updatedProjects: ProjectType[]) => void
  handleSelectedProjectChange: (newSelectedProject: ProjectType | null) => void
  updateFilteredProjects: (updatedProjects: ProjectType[]) => void
  handleProjectChange: (updatedProject: ProjectType) => void
  allProjects: ProjectDropdownType[]
}

const Projects: React.FC<ProjectsProps> = ({
  report,
  selectedProject,
  filteredProjects,
  handleProjectsChange,
  handleSelectedProjectChange,
  updateFilteredProjects,
  handleProjectChange,
  allProjects,
}) => {
  const handleAddProject = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!report.id) return

    // Create the new default project
    const newProject: ProjectType = {
      id: '',
      number: undefined,
      name: '',
      expenses: [
        {
          id: '',
          date: '',
          costCategory: '',
          costCode: '',
        },
      ],
    }

    // Use the projects service to create the new project in the database
    projectsService
      .create(report.id, newProject)
      .then((createdProject) => {
        const updatedProjects = report.projects.concat(createdProject)

        handleProjectsChange(updatedProjects)
        handleSelectedProjectChange(createdProject)
      })
      .catch((error: unknown) => {
        console.log(error)
      })
  }

  const handleDeleteProject = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault()
    if (!report.id) return

    projectsService
      .deleteProject(report.id, id)
      .then(() => {
        const updatedProjects = report.projects.filter(
          (project) => project.id !== id
        )
        handleProjectsChange(updatedProjects)

        // Check if selectedProject exists in updatedProjects
        const selectedProjectExists = updatedProjects.some(
          (project) => project.id === selectedProject?.id
        )

        // If selectedProject is not in updatedProjects, set it to null
        if (!selectedProjectExists) handleSelectedProjectChange(null)

        updateFilteredProjects(updatedProjects)
      })
      .catch((error: unknown) => {
        console.log(error)
      })
  }

  return (
    <div className="w-full flex flex-col space-y-4">
      {report.projects.length > 0 && (
        <div className="flex flex-col space-y-2">
          <Title text="Projects" />
          <Subtitle text="Bill to the following projects" />
        </div>
      )}

      <div className="flex flex-col space-y-4 max-h-64 overflow-y-auto md:max-h-full">
        {report.projects.map((project) => (
          <Project
            key={project.id}
            project={project}
            selectedProject={selectedProject}
            filteredProjects={filteredProjects}
            handleProjectChange={handleProjectChange}
            handleDeleteProject={handleDeleteProject}
            handleSelectedProjectChange={handleSelectedProjectChange}
            allProjects={allProjects}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          className="w-full md:w-fit"
          text={
            report.projects.length <= 0 ? 'Start Expense Report' : 'Add Project'
          }
          onClick={(event) => {
            handleAddProject(event)
          }}
        />
      </div>
    </div>
  )
}

export default Projects
