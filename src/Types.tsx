export interface Expense {
  id: number;
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
  breakfast?: number;
  lunch?: number;
  dinner?: number;
}

export interface Project {
  id: number;
  projectNumber: number;
  projectName: string;
  expenses: Expense[];
}
