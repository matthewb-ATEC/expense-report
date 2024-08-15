import Project from "./Project";
import React, { useState } from "react";
import { allProjects } from "../Data/projects";

const Home: React.FC = () => {
  // List of all projecst created by the user to track expenses
  const [projects, setProjects] = useState([{ id: 0 }]);

  // Adds a new default project to the overall list
  const addProject = () => {
    const newProjectId =
      projects.length > 0 ? projects[projects.length - 1].id + 1 : 0;
    const newProject = { id: newProjectId };
    setProjects([...projects, newProject]);
  };

  // Removes the selected project from the overall list
  const removeProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
      </div>

      {projects.map((project) => (
        <div key={project.id}>
          <Project allProjects={allProjects} />

          <button type="button" onClick={() => removeProject(project.id)}>
            Remove Project
          </button>
        </div>
      ))}

      <button type="button" onClick={addProject}>
        Add Project
      </button>
    </form>
  );
};

export default Home;
