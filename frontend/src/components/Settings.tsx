const Settings = () => {
  const editing: boolean = false;

  return (
    <div className="h-full flex flex-col p-8 bg-gray-100 items-center flex-grow">
      <div className="flex flex-col space-y-8 w-11/12 lg:w-fit">
        <div className="w-full flex flex-col space-y-4 items-start bg-white shadow-md p-8 rounded-md">
          <div className="text-xl font-bold">Per Diem</div>
          {/*Breakfast*/}
          {editing ? (
            <div className="flex flex-col space-y-2 items-start">
              <label className="text-gray-600 text-nowrap" htmlFor="breakfast">
                Breakfast
              </label>
              <input
                className="p-2 w-full border-grey-300 border-b-2"
                type="text"
              />
            </div>
          ) : (
            <div className="w-full flex space-x-12 justify-between">
              <div className="text-gray-600 text-nowrap">Breakfast</div>
              <div className="flex space-x-2">
                <div>$12</div>
                <button className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105">
                  Edit
                </button>
              </div>
            </div>
          )}

          {/*Lunch*/}
          {editing ? (
            <div className="flex flex-col space-y-2 items-start">
              <label className="text-gray-600 text-nowrap" htmlFor="Lunch">
                Lunch
              </label>
              <input
                className="p-2 w-full border-grey-300 border-b-2"
                type="text"
              />
            </div>
          ) : (
            <div className="w-full flex space-x-12 justify-between">
              <div className="text-gray-600 text-nowrap">Lunch</div>
              <div className="flex space-x-2">
                <div>$22</div>
                <button className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105">
                  Edit
                </button>
              </div>
            </div>
          )}

          {/*Dinner*/}
          {editing ? (
            <div className="flex flex-col space-y-2 items-start">
              <label className="text-gray-600 text-nowrap" htmlFor="Dinner">
                Dinner
              </label>
              <input
                className="p-2 w-full border-grey-300 border-b-2"
                type="text"
              />
            </div>
          ) : (
            <div className="w-full flex space-x-12 justify-between">
              <div className="text-gray-600 text-nowrap">Dinner</div>
              <div className="flex space-x-2">
                <div>$40</div>
                <button className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105">
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col items-start bg-white shadow-md p-8 rounded-md">
          <div className="text-xl font-bold">Mileage</div>
          {/*Price Per Mile*/}
          {editing ? (
            <div className="flex flex-col space-y-2 items-start">
              <label
                className="text-gray-600 text-nowrap"
                htmlFor="Price Per Mile"
              >
                Price Per Mile
              </label>
              <input
                className="p-2 w-full border-grey-300 border-b-2"
                type="text"
              />
            </div>
          ) : (
            <div className="w-full flex space-x-12 justify-between">
              <div className="text-gray-600 text-nowrap">Price Per Mile</div>
              <div className="flex space-x-2">
                <div>$0.66</div>
                <button className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105">
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex space-x-4">
          <button className="w-full text-nowrap bg-white font-bold text-ATECblue p-2 rounded-md shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105">
            Reset to default
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
