/**
 * @file types.ts - ./frontend/src/data
 * @description Defines TypeScript interfaces for core data models such as
 *              projects, expenses, attachments, and settings. These types are used
 *              throughout the application to ensure type safety when handling data
 *              related to expenses, projects, and settings configuration. By
 *              standardizing these types, the codebase maintains consistency and
 *              reduces errors related to data structure mismatches.
 * @author matthewb
 * @date Created: 2024-10-01 | Last Modified: 2024-10-04
 * @version 1.0.0
 * @license MIT
 * @usage Import and use these types to define the shape of data objects in the application:
 *        Example:
 *        `import { ProjectType, ExpenseType, SettingsType } from './types';`
 *        These types can be used for type annotations in function parameters, return values, or state management to ensure consistency:
 *        `const newProject: ProjectType = { id: '1', number: 123, name: 'New Project', expenses: [] };`
 * @dependencies None
 * @relatedFiles Components or services that manipulate user, project, or expense data,
 *               such as `projects.ts`, `expenses.ts`, or `settingsService.ts`.
 */
export interface ReportType {
  id: string | undefined;
  user: UserType;
  projects: ProjectType[];
}

export interface UserType {
  name: string;
}

export interface ProjectType {
  id: string;
  number: number | undefined;
  name: string;
  description?: string;
  expenses: ExpenseType[];
}

export interface ExpenseType {
  id: string;
  date: string;
  costCategory: string;
  costCode: string;
  cost?: number;
  description?: string;
  mileage?: number;
  purpose?: string;
  fromLocation?: string;
  toLocation?: string;
  roundTrip?: boolean;
  breakfast?: boolean;
  lunch?: boolean;
  dinner?: boolean;
  attachments?: AttachmentType[];
}

export interface AttachmentType {
  id: string;
  file: File | null;
  text: string;
}

// Settings
export interface SettingsType {
  mileageRate: number;
  perDiem: {
    breakfast: number;
    lunch: number;
    dinner: number;
  };
  projects: ProjectDropdownType[];
  costCodes: CostCodeDropdownType[];
}

export interface ProjectDropdownType {
  name: string;
  number: number;
}

export interface CostCodeDropdownType {
  category: string;
  costCode: string;
}
