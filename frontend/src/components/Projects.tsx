/* eslint-disable react/prop-types */
import { ProjectType } from "../data/types";
import projectsService from "../services/projectsService";
import Project from "./Project";
import { v4 as uuidv4 } from "uuid";

interface ProjectsProps {
  projects: ProjectType[];
  selectedProject: ProjectType | null;
  filteredProjects: string[];
  handleProjectsChange: (updatedProjects: ProjectType[]) => void;
  handleProjectChange: (updatedProject: ProjectType) => void;
  updateSelectedProject: (project: ProjectType | null) => void;
  updateFilteredProjects: (updatedProjects: ProjectType[]) => void;
}

const Projects: React.FC<ProjectsProps> = ({
  projects,
  selectedProject,
  filteredProjects,
  handleProjectsChange,
  handleProjectChange,
  updateSelectedProject,
  updateFilteredProjects,
}) => {
  const handleAddProject = () => {
    // Create the new default project
    const newProject: ProjectType = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      id: uuidv4(),
      number: undefined,
      name: "",
      expenses: [
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          id: uuidv4(),
          date: "",
          costCategory: "",
          costCode: "",
        },
      ],
    };

    // Use the projects service to create the new project in the database
    projectsService
      .create(newProject)
      .then((createdProject) => {
        console.log("Successfully created project", createdProject);

        const updatedProjects = projects.concat(createdProject);
        handleProjectsChange(updatedProjects);
        updateSelectedProject(createdProject);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  const handleDeleteProject = (id: string) => {
    console.log(`Deleting project ID: ${id}`);

    const projectToDelete = projects.find((project) => project.id === id);

    projectsService
      .deleteID(id)
      .then(() => {
        const updatedProjects = projects.filter((project) => project.id !== id);
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
      {projects.length > 0 && <div className="text-xl font-bold">Projects</div>}
      <div className="flex flex-col space-y-4 max-h-64 overflow-y-auto md:max-h-full">
        {projects.map((project) => (
          <Project
            key={project.id}
            project={project}
            selectedProject={selectedProject}
            filteredProjects={filteredProjects}
            handleProjectChange={handleProjectChange}
            handleDeleteProject={handleDeleteProject}
            updateSelectedProject={updateSelectedProject}
          />
        ))}
      </div>
      <button
        className="w-full self-center p-2 bg-white shadow-sm rounded-md text-ATECblue font-bold transform transition-transform duration-300 ease-in-out hover:scale-105"
        type="button"
        onClick={() => {
          handleAddProject();
          updateSelectedProject(projects[projects.length]);
        }}
      >
        {projects.length === 0 ? "Start Expense Report" : "Add Project"}
      </button>
    </div>
  );
};

export default Projects;
