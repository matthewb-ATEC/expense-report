/**
 * @file ExpenseReport.tsx - ./frontend/src/components
 * @description The `ExpenseReport` component serves as a comprehensive interface for managing and displaying expenses associated with various projects. It allows users to select projects, view and modify expenses, and generate reports in PDF format. The component utilizes state management to handle project and expense data efficiently.
 * @author matthewb
 * @date Created: 2024-09-30 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage This component should be used within a larger expense management application, where it can interact with a backend service to fetch and update project and expense data. Example usage:
 *        `<ExpenseReport />`
 * @dependencies React for managing component state and lifecycle, along with `projectsService` for API interactions. It also depends on custom components like `Name`, `Projects`, `Expenses`, and `PDF` for specific functionalities.
 * @relatedFiles Related components include `Name.tsx`, `Projects.tsx`, `Expenses.tsx`, and `PDF.tsx`, which are utilized to build the complete expense reporting functionality.
 */

import React, { useEffect, useState } from "react";
import { ExpenseType, ProjectType } from "../data/types";
import projectsService from "../services/projectsService";
import Name from "./Name";
import Projects from "./Projects";
import Expenses from "./Expenses";
import { allProjects } from "../data/projects";
import PDF from "./PDF";

const ExpenseReport: React.FC = () => {
  const [name, setName] = useState<string>("");
  //const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  //const [filteredProjects, setFilteredProjects] = useState<string[]>(
  //  allProjects.map((project) => project.name)
  //);
  const [filteredProjects, setFilteredProjects] =
    useState<{ name: string; number: number }[]>(allProjects);

  useEffect(() => {
    console.log("Initial useEffect");
    projectsService
      .get()
      .then((initialProjects: ProjectType[]) => {
        console.log("Promise fulfilled");
        setProjects(initialProjects);
        setSelectedProject(initialProjects[0]);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
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
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  const handleExpensesChange = (updatedExpenses: ExpenseType[]) => {
    console.log("Expenses changed to", updatedExpenses);

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

  const updateSelectedProject = (project: ProjectType | null) => {
    const newSelectedProject = project;
    setSelectedProject(newSelectedProject);
    console.log("Selected project changed to", newSelectedProject);
  };

  const updateFilteredProjects = (updatedProjects: ProjectType[]) => {
    const filteredProjects = allProjects
      .filter(
        (project) => !updatedProjects.some((p) => p.name === project.name)
      )
      .map((project) => ({
        name: project.name,
        number: project.number, // Keep track of both name and number
      }));
    setFilteredProjects(filteredProjects);
  };

  return (
    <div className="h-full flex p-8 bg-gray-100 justify-center flex-grow">
      <div className="flex w-11/12 lg:w-fit flex-col space-y-8">
        {projects.length === 0 && (
          <Name setName={setName} name={name} /*isInvalid={isNameInvalid}*/ />
        )}
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
          {selectedProject && selectedProject.name !== "" && (
            <Expenses
              project={selectedProject}
              expenses={selectedProject.expenses}
              handleExpensesChange={handleExpensesChange}
            />
          )}
        </div>
        {projects.some((project) => project.expenses.length > 0) && (
          <PDF projects={projects} name={name} />
        )}
      </div>
    </div>
  );
};

export default ExpenseReport;
