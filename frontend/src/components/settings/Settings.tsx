/**
 * @file Settings.tsx - ./frontend/src/components
 * @description A component for managing application settings, including projects list, per diem rates, and mileage rates, with admin-level access for editing.
 *              It fetches settings from the server and allows updates to be saved.
 * @author matthewb
 * @date Created: 2024-10-01 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage This component is used to display and modify application settings related to expenses, including per diem rates and mileage rates.
 *        Admin-level access is required for editing these settings. The component integrates with a settings service for data fetching and updates.
 * @dependencies
 *  - react: ^18.0.0 // React library for building user interfaces
 *  - ../services/settingsService: settingsService // Service for managing settings-related API calls
 *  - ../data/types: SettingsType // Type definition for settings data
 *  - ./Configurable: Configurable // Child component for rendering editable settings fields
 * @relatedFiles
 *  - Configurable.tsx: ./Configurable // Child component for configuring individual settings, ./ConfigurableProject
 */

import { useEffect, useState } from "react";
import settingsService from "../../services/settingsService";
import {
  CostCodeDropdownType,
  ProjectDropdownType,
  SettingsType,
} from "../../data/types";
import Loading from "../Loading";
import Configurable from "./Configurable";
import ConfigurableProject from "./ConfigurableProject";
import ConfigurableCostCode from "./ConfigurableCostCode";

const Settings = () => {
  const [settings, setSettings] = useState<SettingsType>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [addingProject, setAddingProject] = useState<boolean>(false);
  const [newProject, setNewProject] = useState<ProjectDropdownType>({
    number: 0,
    name: "",
  });
  const [addingCostCode, setAddingCostCode] = useState<boolean>(false);
  const [newCostCode, setNewCostCode] = useState<CostCodeDropdownType>({
    costCode: "",
    category: "",
  });

  useEffect(() => {
    settingsService
      .get()
      .then((response) => {
        setSettings(response);
        console.log("Settings fetched", response);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  }, []);

  const handleSave = () => {
    if (!settings) return;

    settingsService
      .set(settings)
      .then((response) => {
        console.log("Settings updated to", response);
        alert("Settings updated successfully!");
      })
      .catch((error: unknown) => {
        console.log(error);
        alert("Failed to update settings.");
      });
  };

  const handleMileageRateChange = (newMileageRate: number) => {
    if (!settings) return;
    const updatedSettings = {
      ...settings,
      mileageRate: newMileageRate,
    };
    setSettings(updatedSettings);
  };

  const handlePerDiemChange = (key: string, newValue: number) => {
    if (!settings) return;
    const updatedSettings = {
      ...settings,
      perDiem: {
        ...settings.perDiem,
        [key]: newValue,
      },
    };
    setSettings(updatedSettings);
  };

  // Projects List
  const handleProjectChange = (updatedProject: ProjectDropdownType) => {
    if (!settings) return;

    const updatedProjects: ProjectDropdownType[] = settings.projects.map(
      (project) =>
        project.name === updatedProject.name ? updatedProject : project
    );

    handleProjectsChange(updatedProjects);
  };

  const handleProjectsChange = (updatedProjects: ProjectDropdownType[]) => {
    if (!settings) return;

    const updatedSettings = {
      ...settings,
      projects: updatedProjects,
    };

    setSettings(updatedSettings);
  };

  const handleDeleteProject = (projectToDelete: ProjectDropdownType) => {
    if (!settings) return;

    if (
      !window.confirm(
        `Are you sure you want to delete ${projectToDelete.number.toString()} - ${
          projectToDelete.name
        }?`
      )
    )
      return;

    const updatedProjects = settings.projects.filter(
      (project) => project !== projectToDelete
    );

    handleProjectsChange(updatedProjects);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedProject: ProjectDropdownType = {
      ...newProject,
      number: Number(event.target.value),
    };
    setNewProject(updatedProject);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedProject: ProjectDropdownType = {
      ...newProject,
      name: event.target.value,
    };
    setNewProject(updatedProject);
  };

  const handleAddProject = () => {
    if (!settings) return;

    const updatedSettings = {
      ...settings,
      projects: settings.projects.concat(newProject),
    };

    setNewProject({
      number: 0,
      name: "",
    });
    setSettings(updatedSettings);
  };

  // Cost Codes list
  const handleCostCodeChange = (updatedCostCode: CostCodeDropdownType) => {
    if (!settings) return;

    const updatedCostCodes: CostCodeDropdownType[] = settings.costCodes.map(
      (costCode) =>
        costCode.category === updatedCostCode.category
          ? updatedCostCode
          : costCode
    );

    handleCostCodesChange(updatedCostCodes);
  };

  const handleCostCodesChange = (updatedCostCodes: CostCodeDropdownType[]) => {
    if (!settings) return;

    const updatedSettings = {
      ...settings,
      costCodes: updatedCostCodes,
    };

    setSettings(updatedSettings);
  };

  const handleDeleteCostCode = (costCodeToDelete: CostCodeDropdownType) => {
    if (!settings) return;

    if (
      !window.confirm(
        `Are you sure you want to delete ${costCodeToDelete.costCode} ${costCodeToDelete.category}?`
      )
    )
      return;

    const updatedCostCodes = settings.costCodes.filter(
      (costCode) => costCode !== costCodeToDelete
    );

    handleCostCodesChange(updatedCostCodes);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCostCode: CostCodeDropdownType = {
      ...newCostCode,
      costCode: event.target.value,
    };
    setNewCostCode(updatedCostCode);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCostCode: CostCodeDropdownType = {
      ...newCostCode,
      category: event.target.value,
    };
    setNewCostCode(updatedCostCode);
  };

  const handleAddCostCode = () => {
    if (!settings) return;

    const updatedSettings = {
      ...settings,
      costCodes: settings.costCodes.concat(newCostCode),
    };

    setNewCostCode({
      costCode: "",
      category: "",
    });
    setSettings(updatedSettings);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === import.meta.env.VITE_ATEC_ADMIN_PASSWORD)
      setIsAdmin(true);
  };

  if (!settings) return <Loading />;

  return (
    <div className="h-full flex p-8 bg-gray-50 justify-center flex-grow">
      <div className="w-full flex flex-col space-y-8 w-11/12 lg:w-fit">
        {!isAdmin && (
          <div className="self-center flex flex-col w-full space-y-2">
            <label className="text-xl font-bold" htmlFor="isAdmin">
              Admin Password
            </label>
            <div className="w-full flex flex-col items-start space-y-2 bg-white shadow-md p-4 rounded-md">
              <div className="text-sm text-gray-500">
                Enter the administation password to enable editing
              </div>
              <input
                className="p-2 w-full border-grey-300 border-b-2"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  handlePasswordChange(e);
                }}
              />
            </div>
          </div>
        )}

        <div className="w-full flex flex-col space-y-8 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:space-y-0">
          <div className="flex flex-col space-y-8">
            {/*Projects*/}
            <div className="flex flex-col space-y-4">
              <div className="text-xl font-bold">Projects</div>
              <div className="w-full flex flex-col max-h-72 space-y-8 overflow-y-auto items-start bg-white shadow-md p-8 rounded-md">
                {settings.projects.map((project) => (
                  <ConfigurableProject
                    key={project.name}
                    project={project}
                    isAdmin={isAdmin}
                    onChange={handleProjectChange}
                    handleDeleteProject={handleDeleteProject}
                  />
                ))}
              </div>

              {isAdmin && (
                <div className="flex flex-col space-y-2 bg-white shadow-md p-4 rounded-md">
                  <div className="w-full flex space-x-4 items-start">
                    <input
                      className="p-2 border-grey-300 border-b-2"
                      type="text"
                      placeholder="Project number"
                      value={newProject.number}
                      onChange={handleNumberChange}
                    />
                    <input
                      className="p-2 w-full border-grey-300 border-b-2"
                      type="text"
                      placeholder="Project Name"
                      value={newProject.name}
                      onChange={handleNameChange}
                    />
                    <button
                      className="text-ATECblue self-center transform transition-transform duration-300 ease-in-out hover:scale-105"
                      onClick={() => {
                        handleAddProject();
                        setAddingProject(!addingProject);
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/*Per Diem*/}
            <div className="w-full flex flex-col space-y-4">
              <div className="text-xl font-bold">Per Diem</div>
              <div className="w-full flex flex-col space-y-4 items-start bg-white shadow-md p-8 rounded-md">
                <Configurable
                  name="Breakfast"
                  value={settings.perDiem.breakfast}
                  isAdmin={isAdmin}
                  onChange={(newValue) => {
                    handlePerDiemChange("breakfast", newValue);
                  }}
                />
                <Configurable
                  name="Lunch"
                  isAdmin={isAdmin}
                  value={settings.perDiem.lunch}
                  onChange={(newValue) => {
                    handlePerDiemChange("lunch", newValue);
                  }}
                />
                <Configurable
                  name="Dinner"
                  isAdmin={isAdmin}
                  value={settings.perDiem.dinner}
                  onChange={(newValue) => {
                    handlePerDiemChange("dinner", newValue);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            {/*Cost Codes*/}
            <div className="flex flex-col space-y-4">
              <div className="text-xl font-bold">Cost Codes</div>
              <div className="w-full flex flex-col max-h-72 space-y-8 overflow-y-auto items-start bg-white shadow-md p-8 rounded-md">
                {settings.costCodes.map((costCode) => (
                  <ConfigurableCostCode
                    key={costCode.category}
                    costCode={costCode}
                    isAdmin={isAdmin}
                    onChange={handleCostCodeChange}
                    handleDeleteCostCode={handleDeleteCostCode}
                  />
                ))}
              </div>
              {isAdmin && (
                <div className="flex flex-col space-y-2 bg-white shadow-md p-4 rounded-md">
                  <div className="w-full flex space-x-4 items-start">
                    <input
                      className="p-2 border-grey-300 border-b-2"
                      type="text"
                      placeholder="Cost Code"
                      value={newCostCode.costCode}
                      onChange={handleCodeChange}
                    />
                    <input
                      className="p-2 flex-grow border-grey-300 border-b-2"
                      type="text"
                      placeholder="Category"
                      value={newCostCode.category}
                      onChange={handleCategoryChange}
                    />
                    <button
                      className="text-ATECblue self-center transform transition-transform duration-300 ease-in-out hover:scale-105"
                      onClick={() => {
                        handleAddCostCode();
                        setAddingCostCode(!addingCostCode);
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/*Mileage*/}
            <div className="w-full flex flex-col space-y-4">
              <div className="text-xl font-bold">Mileage</div>
              <div className="w-full flex flex-col items-start bg-white shadow-md p-8 rounded-md">
                <Configurable
                  name="Mileage Rate"
                  isAdmin={isAdmin}
                  value={settings.mileageRate}
                  onChange={(newValue) => {
                    handleMileageRateChange(newValue);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {isAdmin && (
          <div className="self-center">
            <button
              className="text-white font-bold bg-ATECblue p-2 rounded-md shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
              onClick={handleSave}
            >
              Save changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
