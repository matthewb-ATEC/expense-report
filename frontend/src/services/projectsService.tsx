/**
 * @file projectsService.tsx - frontend/src/services
 * @description Handle CRUD operations for projects within a report
 * @author matthewb
 * @date Created: 2024-10-04 | Last Modified: 2024-10-04
 * @version 1.0.0
 * @license MIT
 * @usage [Add usage information here]
 * @dependencies [Add dependencies here]
 * @relatedFiles [Add related files here]
 */

import axios from 'axios'
import { ProjectType } from '../data/types'

const baseURL = '/api/reports/'

// Fetch all projects for a given report
const getProjects = async (reportId: string) => {
  const request = axios.get<ProjectType[]>(`${baseURL}/${reportId}/projects`)
  const response = await request
  return response.data
}

// Add a new project to a report
const create = async (reportId: string, newProject: ProjectType) => {
  const request = axios.post<ProjectType>(
    `${baseURL}/${reportId}/projects`,
    newProject
  )
  const response = await request
  return response.data
}

// Update an existing project in a report
const update = async (
  reportId: string,
  projectId: string,
  updatedProject: ProjectType
) => {
  const request = axios.put<ProjectType>(
    `${baseURL}/${reportId}/projects/${projectId}`,
    updatedProject
  )
  const response = await request
  return response.data
}

// Delete a project from a report
const deleteProject = async (reportId: string, projectId: string) => {
  const request = axios.delete<ProjectType>(
    `${baseURL}/${reportId}/projects/${projectId}`
  )
  const response = await request
  return response.data
}

const projectsService = { getProjects, create, update, deleteProject }
export default projectsService
