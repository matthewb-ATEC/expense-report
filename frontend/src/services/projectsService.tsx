import axios from "axios";
import { ProjectType } from "../data/types";
const baseURL = "http://localhost:3001/projects";

const get = async () => {
  console.log("Getting all projects");
  const request = axios.get(baseURL);
  const response = await request;
  return response.data;
};

const getID = async (id: string) => {
  console.log(`Getting project ID: ${id}`);
  const request = axios.get(`${baseURL}/${id}`);
  const response = await request;
  return response.data;
};

const create = async (newProject: ProjectType) => {
  console.log(`Creating project ${newProject}`);
  const request = axios.post(baseURL, newProject);
  const response = await request;
  return response.data;
};

const updateID = async (id: string, updatedProject: ProjectType) => {
  console.log(`Updating project ID: ${id}`);
  const request = axios.put(`${baseURL}/${id}`, updatedProject);
  const response = await request;
  return response.data;
};

const deleteID = async (id: string) => {
  console.log(`Deleting project ID: ${id}`);
  const request = axios.delete(`${baseURL}/${id}`);
  const response = await request;
  return response.data;
};

const projectsService = { get, getID, create, updateID, deleteID };
export default projectsService;
