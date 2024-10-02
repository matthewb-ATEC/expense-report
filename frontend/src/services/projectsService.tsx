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
