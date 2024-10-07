/**
 * @file reportsService.tsx - ./frontend/src/services
 * @description This service module handles CRUD operations for reports,
 *              including fetching all reports, getting a report by ID,
 *              creating a new report, updating an existing report by ID,
 *              and deleting a report by ID.
 * @author matthewb
 * @date Created: 2024-10-01 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage Import the service to interact with the API:
 *        `import reportsService from "./reportsService";`
 *        Example usage:
 *        `const reports = await reportsService.get();`
 *        `const report = await reportsService.getID("123");`
 * @dependencies Axios is used for making HTTP requests,
 *               and `ReportType` is imported from the types module.
 * @relatedFiles ../data/types (for `ReportType`)
 */

import axios from "axios";
import { ReportType } from "../data/types";
const baseURL = "/api/reports";

const get = async () => {
  console.log("Getting all reports");
  const request = axios.get<ReportType[]>(baseURL);
  const response = await request;
  return response.data;
};

const getID = async (id: string) => {
  console.log(`Getting report ID: ${id}`);
  const request = axios.get<ReportType>(`${baseURL}/${id}`);
  const response = await request;
  return response.data;
};

const create = async (newReport: ReportType) => {
  console.log("Creating Report");
  const request = axios.post<ReportType>(baseURL, newReport);
  const response = await request;
  return response.data;
};

const updateID = async (id: string, updatedReport: ReportType) => {
  console.log(`Updating report ID: ${id}`);
  const request = axios.put<ReportType>(`${baseURL}/${id}`, updatedReport);
  const response = await request;
  return response.data;
};

const deleteID = async (id: string) => {
  console.log(`Deleting report ID: ${id}`);
  const request = axios.delete<ReportType>(`${baseURL}/${id}`);
  const response = await request;
  return response.data;
};

const reportsService = { get, getID, create, updateID, deleteID };
export default reportsService;
