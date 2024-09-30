import React, { useEffect, useState } from "react";
import { ExpenseType, ProjectType } from "../data/types";
import projectsService from "../services/projectsService";
import Name from "./Name";
import Projects from "./Projects";
import Expenses from "./Expenses";
import { allProjects } from "../data/projects";
import PDF from "./PDF";

const ExpenseReport: React.FC = () => {
  const [name, setName] = useState("");
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  const [filteredProjects, setFilteredProjects] = useState<string[]>(
    allProjects.map((project) => project.name)
  );

  useEffect(() => {
    console.log("Initial useEffect");
    projectsService
      .get()
      .then((initialProjects: ProjectType[]) => {
        console.log("Promise fulfilled");
        setProjects(initialProjects);
        if (initialProjects) setSelectedProject(initialProjects[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleProjectChange = (updatedProject: ProjectType) => {
    projectsService
      .updateID(updatedProject.id, updatedProject)
      .then(() => {
        console.log(`Project changed to`, updatedProject);

        const updatedProjects = projects.map((project) =>
          project.id === updatedProject.id ? updatedProject : project
        );

        setProjects(updatedProjects);
        setSelectedProject(updatedProject);
        updateFilteredProjects(updatedProjects);
      })
      .catch((error) => console.log(error));
  };

  const handleExpensesChange = (updatedExpenses: ExpenseType[]) => {
    console.log(`Expenses changed to ${updatedExpenses}`);

    if (!selectedProject) {
      console.log("No project selected");
      return;
    }

    const updatedProject: ProjectType = {
      ...selectedProject,
      expenses: updatedExpenses,
    };
    handleProjectChange(updatedProject);
    setSelectedProject(updatedProject);
  };

  const updateSelectedProject = (project: ProjectType) => {
    const newSelectedProject = project;
    setSelectedProject(newSelectedProject);
    console.log("Selected project changed to", newSelectedProject);
  };

  const updateFilteredProjects = (updatedProjects: ProjectType[]) => {
    const filteredProjects = allProjects
      .filter(
        (project) => !updatedProjects.some((p) => p.name === project.name)
      )
      .map((project) => project.name);
    setFilteredProjects(filteredProjects);
  };

  return (
    <div className="h-full flex p-8 bg-gray-100 justify-center flex-grow">
      <div className="flex w-11/12 lg:w-fit flex-col space-y-8">
        {projects.length === 0 && <Name setName={setName} />}
        <div className="flex flex-col space-y-8 lg:space-y-0 lg:flex-row lg:space-x-8">
          <Projects
            projects={projects}
            selectedProject={selectedProject}
            filteredProjects={filteredProjects}
            handleProjectsChange={setProjects}
            handleProjectChange={handleProjectChange}
            updateSelectedProject={updateSelectedProject}
            updateFilteredProjects={updateFilteredProjects}
          />
          {selectedProject && selectedProject?.name !== "" && (
            <Expenses
              project={selectedProject || undefined}
              expenses={selectedProject?.expenses}
              handleExpensesChange={handleExpensesChange}
            />
          )}
        </div>
        <PDF projects={projects} name={name} />
      </div>
    </div>
  );
};

export default ExpenseReport;
