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
import { ExpenseType, ProjectType, ReportType } from "../data/types";
import reportsService from "../services/reportsService";
import Name from "./Name";
import Projects from "./Projects";
import Expenses from "./Expenses";
import { allProjects } from "../data/projects";
import PDF from "./PDF";
import Loading from "./Loading";

const ExpenseReport: React.FC = () => {
  const [report, setReport] = useState<ReportType>();
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  const [filteredProjects, setFilteredProjects] = useState<string[]>(
    allProjects.map((project) => project.name)
  );

  useEffect(() => {
    console.log("Initial useEffect");
    const newReport: ReportType = {
      id: undefined,
      user: {
        name: "",
      },
      projects: [],
    };

    reportsService
      .create(newReport)
      .then((reponse) => {
        console.log("Promise fulfilled");
        console.log("Report set to", reponse);
        setReport(reponse);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  }, []);

  const handleReportChange = (updatedReport: ReportType) => {
    if (!updatedReport.id) return;

    reportsService
      .updateID(updatedReport.id, updatedReport)
      .then((result) => {
        console.log("Report updated", result);
        setReport(result);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  const handleProjectsChange = (updatedProjects: ProjectType[]) => {
    if (!report) return;

    const updatedReport: ReportType = {
      ...report,
      projects: updatedProjects,
    };

    handleReportChange(updatedReport);
  };

  const handleProjectChange = (updatedProject: ProjectType) => {
    if (!report) return;
    console.log(`Project changed to`, updatedProject);

    const updatedProjects: ProjectType[] = report.projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );

    const updatedReport: ReportType = {
      ...report,
      projects: updatedProjects,
    };

    handleReportChange(updatedReport);
    setSelectedProject(updatedProject);
    updateFilteredProjects(updatedProjects);
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
      .map((project) => project.name);
    setFilteredProjects(filteredProjects);
  };

  if (!report) return <Loading />;

  return (
    <div className="h-full flex p-8 bg-gray-50 justify-center flex-grow">
      <div className="flex w-11/12 lg:w-fit flex-col space-y-8">
        <Name report={report} handleReportChange={handleReportChange} />

        <div className="flex flex-col space-y-8 lg:space-y-0 lg:flex-row lg:space-x-8">
          <Projects
            report={report}
            selectedProject={selectedProject}
            handleProjectsChange={handleProjectsChange}
            updateSelectedProject={updateSelectedProject}
            updateFilteredProjects={updateFilteredProjects}
            filteredProjects={filteredProjects}
            handleProjectChange={handleProjectChange}
          />
          {selectedProject && selectedProject.name !== "" && (
            <Expenses
              project={selectedProject}
              expenses={selectedProject.expenses}
              handleExpensesChange={handleExpensesChange}
            />
          )}
        </div>
        {report.projects.some((project) => project.expenses.length > 0) && (
          <PDF report={report} />
        )}
      </div>
    </div>
  );
};

export default ExpenseReport;
