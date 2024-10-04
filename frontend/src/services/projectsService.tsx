/**
 * @file projectsService.tsx - ./frontend/src/services
 * @description This service module handles CRUD operations for projects,
 *              including fetching all projects, getting a project by ID,
 *              creating a new project, updating an existing project by ID,
 *              and deleting a project by ID.
 * @author matthewb
 * @date Created: 2024-10-01 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage Import the service to interact with the API:
 *        `import projectsService from "./projectsService";`
 *        Example usage:
 *        `const projects = await projectsService.get();`
 *        `const project = await projectsService.getID("123");`
 * @dependencies Axios is used for making HTTP requests,
 *               and `ProjectType` is imported from the types module.
 * @relatedFiles ../data/types (for `ProjectType`)
 */

import axios from "axios";
import { ProjectType } from "../data/types";
const baseURL = "/api/projects";

const get = async () => {
  console.log("Getting all projects");
  const request = axios.get<ProjectType>(baseURL);
  const response = await request;
  return response.data;
};

const getID = async (id: string) => {
  console.log(`Getting project ID: ${id}`);
  const request = axios.get<ProjectType>(`${baseURL}/${id}`);
  const response = await request;
  return response.data;
};

const create = async (newProject: ProjectType) => {
  console.log("Creating project", newProject);
  const request = axios.post<ProjectType>(baseURL, newProject);
  const response = await request;
  return response.data;
};

const updateID = async (id: string, updatedProject: ProjectType) => {
  console.log(`Updating project ID: ${id}`);
  const request = axios.put<ProjectType>(`${baseURL}/${id}`, updatedProject);
  const response = await request;
  return response.data;
};

const deleteID = async (id: string) => {
  console.log(`Deleting project ID: ${id}`);
  const request = axios.delete<ProjectType>(`${baseURL}/${id}`);
  const response = await request;
  return response.data;
};

const projectsService = { get, getID, create, updateID, deleteID };
export default projectsService;
