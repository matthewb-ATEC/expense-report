import Layout from "./components/Layout";
import ErrorPage from "./components/ErrorPage";
import ExpenseReport from "./components/ExpenseReport";
import Settings from "./components/Settings";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout to wrap components
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <ExpenseReport /> },
      { path: "/report", element: <ExpenseReport /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
