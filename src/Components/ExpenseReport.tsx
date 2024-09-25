import React, { useEffect, useState } from "react";
import { ExpenseType, ProjectType } from "../data/types";
import projectsService from "../services/projectsService";
import Name from "./Name";
import Projects from "./Projects";
import Expenses from "./Expenses";

const ExpenseReport: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );

  useEffect(() => {
    console.log("Initial useEffect");
    projectsService
      .get()
      .then((initialProjects) => {
        console.log("Promise fulfilled");
        setProjects(initialProjects);
        setSelectedProject(initialProjects[0]);
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

  const handleSelectedProjectChange = (project: ProjectType) => {
    const newSelectedProject = project;
    setSelectedProject(newSelectedProject);
    console.log("Selected project changed to", newSelectedProject);
  };

  return (
    <div className="flex p-8 bg-gray-100 justify-center items-center">
      <div className="flex flex-col self-center space-y-8">
        <Name />
        <div className="flex space-x-8">
          <Projects
            projects={projects}
            handleProjectsChange={setProjects}
            handleSelectedProjectChange={handleSelectedProjectChange}
          />
          {projects.length > 0 && (
            <Expenses
              expenses={selectedProject?.expenses}
              handleExpensesChange={handleExpensesChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseReport;
