/**
 * @file Name.tsx - ./frontend/src/components
 * @description The `Name` component is a functional React component that renders an input field for users to enter their full name. It utilizes a prop function `setName` to update the parent component's state whenever the input value changes. This component enhances form usability by providing clear labeling and structured styling.
 * @author matthewb
 * @date Created: 2024-09-30 | Last Modified: 2024-09-30
 * @version 1.0.0
 * @license MIT
 * @usage The `Name` component should be used within a form or user input section where capturing the user's full name is required. It requires a `setName` function as a prop to handle updates to the name state in the parent component. Example usage:
 *        `<Name setName={setNameFunction} />`
 * @dependencies
 *  - React for building the component.
 * @relatedFiles Related components may include other input components or forms that gather user information, such as `Email.tsx` or `Address.tsx`.
 */

import React from "react";

interface NameProps {
  setName: (name: string) => void;
  name: string;
}

const Name: React.FC<NameProps> = ({ setName, name }) => {
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
          //className={`p-2 w-full border-b-2 ${
          //  isInvalid ? "border-red-500" : "border-gray-300"
          //}`}
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Name;
