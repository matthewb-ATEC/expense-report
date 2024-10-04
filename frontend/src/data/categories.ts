/**
 * @file categories.ts - ./frontend/src/data
 * @description Contains the predefined list of expense categories
 *              and their corresponding cost codes used in the application
 *              for reporting and expense tracking.
 * @author matthewb
 * @date Created: 2024-09-30 | Last Modified: 2024-10-04
 * @version 1.0.0
 * @license MIT
 * @usage Import the `categories` list wherever needed for displaying or validating expense categories:
 *        `import { categories } from './categories';`
 *        Example:
 *        `categories.map(category => console.log(category.category, category.costCode));`
 * @dependencies None
 * @relatedFiles ../components/Expense.tsx
 */

export const categories = [
  { category: "Air Fare", costCode: "62-1001-TRV" },
  { category: "Car Rental", costCode: "62-1004-TRV" },
  { category: "Reimbursable Gas", costCode: "62-1011-TRV" },
  { category: "Hotel", costCode: "62-1002-TRV" },
  { category: "Tolls/Parking", costCode: "62-1009-TRV" },
  { category: "Client Entertainment", costCode: "62-1006-TRV" },
  { category: "Per Diem", costCode: "62-1005-TRV" },
  { category: "Job Site Material", costCode: "" },
  { category: "Mileage", costCode: "" },
  { category: "Other", costCode: "" },
];
