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
import { ProjectDropdownType, ProjectType, ReportType } from "../data/types";
import projectsService from "../services/projectsService";
import Project from "./Project";

interface ProjectsProps {
  report: ReportType;
  selectedProject: ProjectType | null;
  filteredProjects: string[];
  handleProjectsChange: (updatedProjects: ProjectType[]) => void;
  updateSelectedProject: (project: ProjectType | null) => void;
  updateFilteredProjects: (updatedProjects: ProjectType[]) => void;
  handleProjectChange: (updatedProject: ProjectType) => void;
  allProjects: ProjectDropdownType[];
}

const Projects: React.FC<ProjectsProps> = ({
  report,
  selectedProject,
  filteredProjects,
  handleProjectsChange,
  updateSelectedProject,
  updateFilteredProjects,
  handleProjectChange,
  allProjects,
}) => {
  const handleAddProject = () => {
    if (!report.id) return;

    // Create the new default project
    const newProject: ProjectType = {
      id: "",
      number: undefined,
      name: "",
      expenses: [
        {
          id: "",
          date: "",
          costCategory: "",
          costCode: "",
        },
      ],
    };

    // Use the projects service to create the new project in the database
    projectsService
      .create(report.id, newProject)
      .then((createdProject) => {
        console.log("Successfully created project", createdProject);

        const updatedProjects = report.projects.concat(createdProject);

        handleProjectsChange(updatedProjects);
        updateSelectedProject(createdProject);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  const handleDeleteProject = (id: string) => {
    if (!report.id) return;

    console.log(`Deleting project ID: ${id}`);

    const projectToDelete = report.projects.find(
      (project) => project.id === id
    );

    projectsService
      .deleteProject(report.id, id)
      .then(() => {
        const updatedProjects = report.projects.filter(
          (project) => project.id !== id
        );
        handleProjectsChange(updatedProjects);

        if (projectToDelete === selectedProject) updateSelectedProject(null);

        updateFilteredProjects(updatedProjects);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      {report.projects.length > 0 && (
        <div className="text-xl font-bold">Projects</div>
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
            updateSelectedProject={updateSelectedProject}
            allProjects={allProjects}
          />
        ))}
      </div>
      <button
        className="w-full self-center p-2 bg-white shadow-md rounded-md text-ATECblue font-bold transform transition-transform duration-300 ease-in-out hover:scale-105"
        type="button"
        onClick={() => {
          handleAddProject();
        }}
      >
        {report.projects.length <= 0 ? "Start Expense Report" : "Add Project"}
      </button>
    </div>
  );
};

export default Projects;
