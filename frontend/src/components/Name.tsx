import React from "react";

const Name = ({ setName }: { setName: (name: string) => void }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div className="p-8 bg-white border-gray-100 border-2 rounded-md shadow-sm">
      <div className="flex flex-col w-full items-start space-y-2">
        <label className="text-gray-600" htmlFor="name">
          Full Name
        </label>
        <input
          className="p-2 w-full border-grey-300 border-b-2"
          type="text"
          id="name"
          name="name"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Name;
