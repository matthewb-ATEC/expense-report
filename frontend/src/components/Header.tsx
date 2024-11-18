/**
 * @file Header.tsx - ./frontend/src/components
 * @description The `Header` component displays the application's logo and dynamically changes the main and subheader text based on the current route. It is designed to provide context to users about the current page they are viewing within the application.
 * @author matthewb
 * @date Created: 2024-10-01 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage The `Header` component can be included at the top of any page to provide navigation context. It uses `react-router-dom` to determine the current route and display the appropriate title and subtitle. Example usage:
 *        `<Header />`
 * @dependencies
 *  - React for building the component and managing its state.
 *  - `react-router-dom` for accessing the current route location.
 * @relatedFiles Related components include `Footer.tsx`, `ExpenseReport.tsx`, and any other components that make up the main layout of the application.
 */

import React from 'react'
import { useLocation } from 'react-router-dom'

const headers: Record<string, string> = {
  '/': 'Expense Report',
  '/report': 'Expense Report',
  '/settings': 'Settings',
}

const subheaders: Record<string, string> = {
  '/': 'File an expense report using the form below.',
  '/report': 'File an expense report using the form below.',
  '/settings': 'View and edit the parameters underlying expense calculations.',
}

const Header: React.FC = () => {
  const location = useLocation()

  return (
    <div className="flex flex-col space-y-4 w-full items-center justify-center p-8 bg-white shadow-lg">
      <img className="h-16" src="/images/ATEC-logo.png" alt="AdvanceTEC" />
      <div className="flex flex-col text-center space-y-2">
        <div className="text-2xl font-semibold">
          {headers[location.pathname]}
        </div>
        <div className="text-sm text-gray-500">
          {subheaders[location.pathname]}
        </div>
      </div>
    </div>
  )
}

export default Header
