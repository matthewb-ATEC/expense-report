import Nav from "./components/Nav";
import Header from "./components/Header";
import Footer from "./components/Footer";

import ExpenseReport from "./components/ExpenseReport";
import Settings from "./components/Settings";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ExpenseReport />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/report",
    element: <ExpenseReport />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/settings",
    element: <Settings />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
