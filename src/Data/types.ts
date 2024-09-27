export interface User {
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
  taxable?: boolean;
  attachments?: AttachmentType[];
}

export interface AttachmentType {
  id: string;
  file: File | null;
  text: string;
}
