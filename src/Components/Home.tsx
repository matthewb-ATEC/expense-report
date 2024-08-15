import Project from "./Project";
import React, { useState } from "react";
import { allProjects } from "../Data/projects";
import { Project as ProjectType } from "../Types";

const Home: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([
    {
      id: 0,
      projectNumber: 0,
      projectName: "",
      expenses: [
        {
          id: 0,
          date: "",
          costCategory: "",
          costCode: "",
        },
      ],
    },
  ]);

  const addProject = () => {
    const newProjectId =
      projects.length > 0 ? projects[projects.length - 1].id + 1 : 0;

    const newProject: ProjectType = {
      id: newProjectId,
      projectNumber: 0,
      projectName: "",
      expenses: [
        {
          id: 0,
          date: "",
          costCategory: "",
          costCode: "",
        },
      ],
    };

    setProjects([...projects, newProject]);
  };

  const removeProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleProjectUpdate = (updatedProject: any) => {
    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(JSON.stringify(projects));
    // Send the projects data to the backend or handle it as needed
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
      </div>

      {projects.map((project) => (
        <div key={project.id}>
          <Project
            project={project}
            allProjects={allProjects}
            updateProject={handleProjectUpdate}
          />
          <button type="button" onClick={() => removeProject(project.id)}>
            Remove Project
          </button>
        </div>
      ))}

      <button type="button" onClick={addProject}>
        Add Project
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Home;
