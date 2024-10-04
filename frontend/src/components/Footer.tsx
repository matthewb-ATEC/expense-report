/**
 * @file Footer.tsx - ./frontend/src/components
 * @description The `Footer` component serves as the footer section of the application, providing contact information for support. It is designed to be displayed at the bottom of the page and features a simple, responsive layout with a background color matching the application's branding.
 * @author matthewb
 * @date Created: 2024-10-01 | Last Modified: 2024-10-01
 * @version 1.0.0
 * @license MIT
 * @usage This component is intended to be included in the main layout of the application. It does not require any props. Example usage:
 *        `<Footer />`
 * @dependencies React for building the component and managing its structure and styles using Tailwind CSS for styling.
 * @relatedFiles Related files include layout components that integrate this footer into the overall application structure, such as `App.tsx` or `MainLayout.tsx`.
 */

import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="flex flex-col text-center p-8 text-white bg-ATECblue">
      <div>
        Contact matthewb@advancetecllc.com or tanujk@advancetecllc.com for
        support
      </div>
    </div>
  );
};

export default Footer;
