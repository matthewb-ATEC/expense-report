import Configurable from "./Configurable";
import { mileageRate, perDiem } from "../data/config";

const Settings = () => {
  return (
    <div className="h-full flex flex-col p-8 bg-gray-100 items-center flex-grow">
      <div className="flex flex-col space-y-8 w-11/12 lg:w-fit">
        <div className="w-full flex flex-col space-y-8 lg:grid lg:grid-cols-2 lg:space-x-4 lg:space-y-0">
          <div className="w-full flex flex-col space-y-4">
            <div className="text-xl font-bold">Per Diem</div>
            <div className="w-full flex flex-col space-y-4 items-start bg-white shadow-md p-8 rounded-md">
              <Configurable name={"Breakfast"} value={perDiem.breakfast} />
              <Configurable name={"Lunch"} value={perDiem.lunch} />
              <Configurable name={"Dinner"} value={perDiem.dinner} />
            </div>
          </div>
          <div className="w-full flex flex-col space-y-4">
            <div className="text-xl font-bold">Mileage</div>
            <div className="w-full flex flex-col items-start bg-white shadow-md p-8 rounded-md">
              <Configurable name={"Mileage Rate"} value={mileageRate} />
            </div>
          </div>
        </div>

        <div className="w-full space-y-4 lg:grid lg:grid-cols-2 lg:space-x-4 lg:space-y-0">
          <button className="w-full text-nowrap bg-white font-bold text-ATECblue p-2 rounded-md shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105">
            Reset
          </button>
          <button className="w-full text-white font-bold bg-ATECblue p-2 rounded-md shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
