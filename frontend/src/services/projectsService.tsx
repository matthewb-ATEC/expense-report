/**
 * @file projectsService.tsx - ./frontend/src/services
 * @description [Add description here]
 * @author matthewb
 * @date Created: 2024-10-01 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage [Add usage information here]
 * @dependencies [Add dependencies here]
 * @relatedFiles [Add related files here]
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
