/**
 * @file results.ts - ./frontend/src/data
 * @description Holds data structures for tracking and summarizing expense categories,
 *              including a total sum and a breakdown by category and cost code.
 *              This file is used to store and update expense totals as part of the financial
 *              tracking system within the application.
 * @author matthewb
 * @date Created: 2024-10-01 | Last Modified: 2024-10-04
 * @version 1.0.0
 * @license MIT
 * @usage Import the `total`, `breakdown`, and `summaries` arrays where needed to display, calculate, or manipulate financial data in the app:
 *        `import { total, breakdown, summaries } from './results';`
 *        Example:
 *        `total.value += newExpenseAmount; breakdown.find(b => b.category === category).sum += newExpenseAmount;`
 * @dependencies None
 * @relatedFiles ../components/PDF.tsx
 */
import { AttachmentType } from './types'

export const total = { value: 0 }
export const breakdown = [
  { category: 'Air Fare', costCode: '62-1001-TRV', sum: 0 },
  { category: 'Apartments', costCode: '62-1003-TRV', sum: 0 },
  { category: 'Car Rental', costCode: '62-1004-TRV', sum: 0 },
  { category: 'Client Entertainment', costCode: '62-1006-TRV', sum: 0 },
  { category: 'Company Events', costCode: '62-1007-TRV', sum: 0 },
  { category: 'Hotel', costCode: '62-1002-TRV', sum: 0 },
  { category: 'Job Site Material', costCode: '01-7200-MAT', sum: 0 },
  { category: 'Mileage', costCode: '62-1009-TRV', sum: 0 },
  { category: 'Parking', costCode: '62-1010-TRV', sum: 0 },
  { category: 'Per Diem', costCode: '62-1005-TRV', sum: 0 },
  { category: 'Reimbursable Gas', costCode: '62-1011-TRV', sum: 0 },
  { category: 'Relocation', costCode: '62-1008-TRV', sum: 0 },
  { category: 'Tolls', costCode: '62-1009-TRV', sum: 0 },
  { category: 'Wellness', costCode: '64-6161-OVH', sum: 0 },
  { category: 'Auto Expense & Repairs', costCode: '64-6009', sum: 0 },
  { category: 'Other', costCode: '', sum: 0 },
]

export const sessionAttachments: AttachmentType[] = []
export const summaries = []
