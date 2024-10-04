/**
 * @file Nav.tsx - ./frontend/src/components
 * @description The `Nav` component is a functional React component that renders a navigation bar with links to the Expense Report and Settings pages. It utilizes React Router's `Link` component for navigation, ensuring that the application can transition between routes without full page reloads. The navigation bar is styled with Tailwind CSS classes for a responsive and visually appealing layout.
 * @author matthewb
 * @date Created: 2024-10-01 | Last Modified: 2024-10-01
 * @version 1.0.0
 * @license MIT
 * @usage The `Nav` component should be included in the main layout of the application to provide users with easy access to different sections. It does not require any props and can be placed directly in the JSX structure where navigation is needed. Example usage:
 *        `<Nav />`
 * @dependencies
 *  - React Router for routing functionalities (specifically the `Link` component).
 *  - Tailwind CSS for styling the navigation bar.
 * @relatedFiles Related components may include `Header.tsx`, `Footer.tsx`, and `Layout.tsx` which together create the overall structure of the application.
 */

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="p-4 w-full flex space-x-8 justify-end bg-ATECblue text-white">
      <Link to={`/report`}>Expense Report</Link>
      <Link to={`/settings`}>Settings</Link>
    </div>
  );
};

export default Nav;
