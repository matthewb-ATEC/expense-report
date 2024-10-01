import { useEffect, useState } from "react";
import Configurable from "./Configurable";
import settingsService from "../services/settingsService";
import { SettingsType } from "../data/types";

const Settings = () => {
  const [settings, setSettings] = useState<SettingsType | undefined>(undefined);

  useEffect(() => {
    settingsService
      .get()
      .then((response) => {
        setSettings(response);
        console.log("Settings fetched", response);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSave = async () => {
    settingsService
      .set(settings)
      .then((response) => console.log("Settings updated to", response))
      .catch((error) => console.log(error));
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

  if (!settings) return <div>Loading...</div>;

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
                onChange={(newValue) =>
                  handlePerDiemChange("breakfast", newValue)
                }
              />
              <Configurable
                name="Lunch"
                value={settings.perDiem.lunch}
                onChange={(newValue) => handlePerDiemChange("lunch", newValue)}
              />
              <Configurable
                name="Dinner"
                value={settings.perDiem.dinner}
                onChange={(newValue) => handlePerDiemChange("dinner", newValue)}
              />
            </div>
          </div>
          <div className="w-full flex flex-col space-y-4">
            <div className="text-xl font-bold">Mileage</div>
            <div className="w-full flex flex-col items-start bg-white shadow-md p-8 rounded-md">
              <Configurable
                name="Mileage Rate"
                value={settings.mileageRate}
                onChange={(newValue) => handleMileageRateChange(newValue)}
              />
            </div>
          </div>
        </div>

        <div className="w-full space-y-4 lg:grid lg:grid-cols-2 lg:space-x-4 lg:space-y-0">
          <button
            className="w-full text-nowrap bg-white font-bold text-ATECblue p-2 rounded-md shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              setSettings({
                // Example default value
                mileageRate: 0.66,
                perDiem: {
                  breakfast: 12,
                  lunch: 22,
                  dinner: 40,
                },
              });
            }}
          >
            Reset
          </button>
          <button
            className="w-full text-white font-bold bg-ATECblue p-2 rounded-md shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
