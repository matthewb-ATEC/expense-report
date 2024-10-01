import { useState } from "react";

interface ConfigurableProps {
  name: string;
  value: number;
}

const Configurable: React.FC<ConfigurableProps> = ({ name, value }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (isEditing)
    return (
      <div className="w-full flex flex-col space-y-2 items-start">
        <div className="w-full flex justify-between">
          <label className="text-gray-600 text-nowrap" htmlFor={name}>
            {name}
          </label>
          <button
            className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => setIsEditing(!isEditing)}
          >
            Close
          </button>
        </div>
        <input
          className="p-2 w-full border-grey-300 border-b-2"
          type="text"
          value={value}
        />
      </div>
    );

  return (
    <div className="w-full flex space-x-12 justify-between">
      <div className="text-gray-600 text-nowrap">{name}</div>
      <div className="flex space-x-2">
        <div>${value}</div>
        <button
          className="text-ATECblue transform transition-transform duration-300 ease-in-out hover:scale-105"
          onClick={() => setIsEditing(!isEditing)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Configurable;
