import { ProjectType } from "../data/types";
import projectsService from "../services/projectsService";
import Project from "./Project";
import { v4 as uuidv4 } from "uuid";

interface ProjectsProps {
  projects: ProjectType[];
  handleProjectsChange: Function;
  handleSelectedProjectChange: Function;
}

const Projects: React.FC<ProjectsProps> = ({
  projects,
  handleProjectsChange,
  handleSelectedProjectChange,
}) => {
  const handleProjectChange = (updatedProject: ProjectType) => {
    projectsService
      .updateID(updatedProject.id, updatedProject)
      .then(() => {
        console.log(`Project changed to`, updatedProject);

        const updatedProjects = projects.map((project) =>
          project.id === updatedProject.id ? updatedProject : project
        );

        handleProjectsChange(updatedProjects);
      })
      .catch((error) => console.log(error));
  };

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

    projectsService
      .deleteID(id)
      .then(() => {
        const updatedProjects = projects.filter((project) => project.id !== id);
        handleProjectsChange(updatedProjects);
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
        className="w-full self-center p-2 bg-white shadow-sm rounded-md text-ATECblue font-bold"
        type="button"
        onClick={() => {
          handleAddProject();
          handleSelectedProjectChange(projects[projects.length]);
        }}
      >
        Add Project
      </button>
    </div>
  );
};

export default Projects;
