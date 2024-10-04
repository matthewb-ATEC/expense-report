/**
 * @file Settings.tsx - ./frontend/src/components
 * @description A component for managing application settings, including per diem rates and mileage rates, with admin-level access for editing.
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
 *  - Configurable.tsx: ./Configurable // Child component for configuring individual settings
 */

import { useEffect, useState } from "react";
import Configurable from "./Configurable";
import settingsService from "../services/settingsService";
import { SettingsType } from "../data/types";
import Loading from "./Loading";

const Settings = () => {
  const [settings, setSettings] = useState<SettingsType>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
    if (settings) {
      const updatedSettings = {
        ...settings,
        mileageRate: newMileageRate,
      };
      setSettings(updatedSettings);
    }
  };

  const handlePerDiemChange = (key: string, newValue: number) => {
    if (settings) {
      const updatedSettings = {
        ...settings,
        perDiem: {
          ...settings.perDiem,
          [key]: newValue,
        },
      };
      setSettings(updatedSettings);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === import.meta.env.VITE_ATEC_ADMIN_PASSWORD)
      setIsAdmin(true);
  };

  if (!settings) return <Loading />;

  return (
    <div className="h-full flex flex-col p-8 bg-gray-100 items-center flex-grow">
      <div className="flex flex-col space-y-8 w-11/12 lg:w-fit">
        <div className="w-full flex flex-col space-y-8 lg:grid lg:grid-cols-2 lg:space-x-4 lg:space-y-0">
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

        {isAdmin ? (
          <div className="w-full">
            <button
              className="w-full text-white font-bold bg-ATECblue p-2 rounded-md shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex flex-col w-full space-y-2">
            <label className="font-bold" htmlFor="isAdmin">
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
      </div>
    </div>
  );
};

export default Settings;
