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
import {
  ExpenseType,
  ProjectDropdownType,
  ProjectType,
  ReportType,
  SettingsType,
} from "../data/types";
import reportsService from "../services/reportsService";
import Name from "./Name";
import Projects from "./Projects";
import Expenses from "./Expenses";
import PDF from "./PDF";
import Loading from "./Loading";
import settingsService from "../services/settingsService";

const ExpenseReport: React.FC = () => {
  const [report, setReport] = useState<ReportType>();
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  const [filteredProjects, setFilteredProjects] =
    useState<ProjectDropdownType[]>();
  const [settings, setSettings] = useState<SettingsType>();

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

    settingsService
      .get()
      .then((settings) => {
        setFilteredProjects(settings.projects);
        setSettings(settings);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  }, []);

  const handleReportChange = (updatedReport: ReportType) => {
    if (!updatedReport.id) return;

    reportsService
      .updateID(updatedReport.id, updatedReport)
      .then((newReport) => {
        console.log("Report updated", newReport);
        setReport(newReport);
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

  const handleSelectedProjectChange = (
    newSelectedProject: ProjectType | null
  ) => {
    setSelectedProject(newSelectedProject);
    console.log("Selected project changed to", newSelectedProject);
  };

  const updateFilteredProjects = (updatedProjects: ProjectType[]) => {
    if (!settings?.projects) return;

    const filteredProjects: ProjectDropdownType[] = settings.projects
      .filter(
        (project) => !updatedProjects.some((p) => p.name === project.name)
      )
      .map((project) => ({
        name: project.name,
        number: project.number, // Keep track of both name and number
      }));
    setFilteredProjects(filteredProjects);
  };

  if (!report || !filteredProjects || !settings) return <Loading />;

  return (
    <div className="h-full flex p-8 bg-gray-50 justify-center flex-grow">
      <div
        className={`flex w-11/12 lg:w-fit flex-col
          ${report.projects.length > 0 ? "space-y-8" : "space-y-2"}`}
      >
        <Name report={report} handleReportChange={handleReportChange} />

        <div className="flex flex-col space-y-8 lg:space-y-0 lg:flex-row lg:space-x-8">
          <Projects
            report={report}
            selectedProject={selectedProject}
            handleProjectsChange={handleProjectsChange}
            handleSelectedProjectChange={handleSelectedProjectChange}
            updateFilteredProjects={updateFilteredProjects}
            filteredProjects={filteredProjects}
            handleProjectChange={handleProjectChange}
            allProjects={settings.projects}
          />
          {selectedProject !== null && selectedProject.name !== "" && (
            <Expenses
              report={report}
              project={selectedProject}
              expenses={selectedProject.expenses}
              costCodes={settings.costCodes}
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
