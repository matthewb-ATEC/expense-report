/**
 * @file Layout.tsx - ./frontend/src/components
 * @description The `Layout` component serves as a wrapper for the main application layout, providing a consistent structure that includes the navigation, header, footer, and the main content area where routed components are displayed. It ensures a cohesive user experience across different pages of the application.
 * @author matthewb
 * @date Created: 2024-10-01 | Last Modified: 2024-10-01
 * @version 1.0.0
 * @license MIT
 * @usage The `Layout` component should be used as a parent component in the application's routing configuration. It renders the navigation bar, header, footer, and the content of the current route via the `Outlet` component from `react-router-dom`. Example usage:
 *        `<Layout />`
 * @dependencies
 *  - React for building the component.
 *  - `react-router-dom` for routing functionality and rendering nested routes with the `Outlet` component.
 * @relatedFiles Related components include `Nav.tsx`, `Header.tsx`, `Footer.tsx`, and any routed components that will be displayed within the `Layout`.
 */

import Nav from "./Nav";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
