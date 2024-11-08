import Report from '../models/report.js'
import express from 'express'
const projectsRouter = express.Router()

projectsRouter.get('/:reportId/projects', async (request, response) => {
  const reportId = request.params.reportId
  const report = await Report.findById(reportId)
  if (!report) {
    return response.status(404).json({ error: 'Report not found' })
  }
  response.json(report.projects).status(200)
})

projectsRouter.get(
  '/:reportId/projects/:projectId',
  async (request, response) => {
    const reportId = request.params.reportId
    const projectId = request.params.projectId

    const report = await Report.findById(reportId)

    if (!report) {
      return response.status(404).json({ error: 'Report not found' })
    }

    const project = report.projects.find((project) => project.id === projectId)

    if (!project) {
      return response.status(404).json({ error: 'Project not found' })
    }

    response.json(project)
  },
)

projectsRouter.delete(
  '/:reportId/projects/:projectId',
  async (request, response) => {
    const reportId = request.params.reportId
    const projectId = request.params.projectId

    const report = await Report.findById(reportId)
    if (!report) {
      return response.status(404).json({ error: 'Report not found' })
    }

    report.projects = report.projects.filter(
      (project) => project.id !== projectId,
    )

    await report.save()
    response.status(204).end()
  },
)

projectsRouter.post('/:reportId/projects', async (request, response) => {
  const reportId = request.params.reportId

  const report = await Report.findById(reportId)

  if (!report) {
    return response.status(404).json({ error: 'Report not found' })
  }

  const newProject = request.body

  report.projects.push(newProject)

  const updatedReport = await report.save()
  const addedProject = updatedReport.projects[updatedReport.projects.length - 1]
  response.status(201).json(addedProject)
})

projectsRouter.put(
  '/:reportId/projects/:projectId',
  async (request, response) => {
    const reportId = request.params.reportId
    const projectId = request.params.projectId

    const report = await Report.findById(reportId)

    if (!report) {
      return response.status(404).json({ error: 'Report not found' })
    }

    const updatedProject = request.body

    /*
    if (!report.projects.find((project) => project.id === projectId)) {
      return response.status(404).json({ error: 'Project not found' })
    }
    */

    report.projects = report.projects.map((project) =>
      project.id === projectId ? updatedProject : project,
    )

    const result = report.projects.find((project) => project.id === projectId)

    response.status(200).json(result)
  },
)

export default projectsRouter
