import { ProjectType } from "../data/types";
import projectsService from "../services/projectsService";
import Project from "./Project";
import { v4 as uuidv4 } from "uuid";

interface ProjectsProps {
  projects: ProjectType[];
  selectedProject: ProjectType | null;
  handleProjectsChange: Function;
  handleProjectChange: Function;
  handleSelectedProjectChange: Function;
}

const Projects: React.FC<ProjectsProps> = ({
  projects,
  selectedProject,
  handleProjectsChange,
  handleProjectChange,
  handleSelectedProjectChange,
}) => {
  const handleAddProject = () => {
    // Create the new default project
    const newProject: ProjectType = {
      id: uuidv4(),
      number: undefined,
      name: "",
      expenses: [
        {
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
        handleSelectedProjectChange(createdProject);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteProject = (id: string) => {
    console.log(`Deleting project ID: ${id}`);

    const projectToDelete = projects.find((project) => project.id === id);

    projectsService
      .deleteID(id)
      .then(() => {
        const updatedProjects = projects.filter((project) => project.id !== id);
        handleProjectsChange(updatedProjects);

        if (projectToDelete === selectedProject)
          handleSelectedProjectChange(null);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      {projects.length > 0 && <div className="text-xl font-bold">Projects</div>}
      {projects.map((project) => (
        <Project
          key={project.id}
          project={project}
          handleProjectChange={handleProjectChange}
          handleDeleteProject={handleDeleteProject}
          handleSelectedProjectChange={handleSelectedProjectChange}
        />
      ))}
      <button
        className="w-full self-center p-2 bg-white shadow-sm rounded-md text-ATECblue font-bold transform transition-transform duration-300 ease-in-out hover:scale-105"
        type="button"
        onClick={() => {
          handleAddProject();
          handleSelectedProjectChange(projects[projects.length]);
        }}
      >
        {projects.length === 0 ? "Start Expense Report" : "Add Project"}
      </button>
    </div>
  );
};

export default Projects;
