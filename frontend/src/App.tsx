/**
 * @file App.tsx - ./frontend/src
 * @description This component sets up the main application layout and routing.
 * @author matthewb
 * @date Created: 09-30-2024 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage Render this component within the main entry point of the application (e.g., index.tsx).
 * @dependencies React, react-router-dom
 * @relatedFiles ./components/Layout.tsx, ./components/ErrorPage.tsx, ./components/ExpenseReport.tsx, ./components/Settings.tsx
 */

import Layout from './components/Layout'
import ErrorPage from './components/ErrorPage'
import ExpenseReport from './components/ExpenseReport'
import Settings from './components/settings/Settings'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <ExpenseReport /> },
      { path: '/expense-report', element: <ExpenseReport /> },
      { path: '/settings', element: <Settings /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
