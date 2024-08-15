export interface Project {
  id: string;
  projectNumber: number;
  projectName: string;
  expenses: Expense[];
}

export interface Expense {
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
  breakfast?: number;
  lunch?: number;
  dinner?: number;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  file: File | null;
}
