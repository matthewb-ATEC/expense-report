import axios from "axios";
import { ExpenseType } from "../data/types";

const baseURL = "/api/reports/";

// Fetch all expenses for a given report
const getExpenses = async (reportId: string, projectId: string) => {
  console.log(
    `Getting all expenses for report ID: ${reportId} project ID: ${projectId}`
  );
  const request = axios.get<ExpenseType[]>(
    `${baseURL}/${reportId}/projects/${projectId}/expenses`
  );
  const response = await request;
  return response.data;
};

// Add a new expense to a project
const create = async (
  reportId: string,
  projectId: string,
  newExpense: ExpenseType
) => {
  console.log(`Creating new project in report ID: ${reportId}`);
  const request = axios.post<ExpenseType>(
    `${baseURL}/${reportId}/projects/${projectId}/expenses`,
    newExpense
  );
  const response = await request;
  return response.data;
};

// Update an existing expense in a project
const update = async (
  reportId: string,
  projectId: string,
  expenseId: string,
  updatedProject: ExpenseType
) => {
  console.log(
    `Updating expense ID: ${expenseId} in project ID: ${projectId} in report ID: ${reportId}`
  );
  const request = axios.put<ExpenseType>(
    `${baseURL}/${reportId}/projects/${projectId}/expenses/${expenseId}`,
    updatedProject
  );
  const response = await request;
  return response.data;
};

// Delete an expense from a project
const deleteExpense = async (
  reportId: string,
  projectId: string,
  expenseId: string
) => {
  console.log(
    `Deleting expense ID: ${expenseId} in project ID: ${projectId} in report ID: ${reportId}`
  );
  const request = axios.delete<ExpenseType>(
    `${baseURL}/${reportId}/projects/${projectId}/expenses/${expenseId}`
  );
  const response = await request;
  return response.data;
};

const expensesService = { getExpenses, create, update, deleteExpense };
export default expensesService;
