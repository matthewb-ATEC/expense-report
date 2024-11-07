import Report from '../models/report.js'
import express from 'express'
const expensesRouter = express.Router()

expensesRouter.get(
  '/:reportId/projects/:projectId/expenses',
  async (request, response, next) => {
    const reportId = request.params.reportId
    const projectId = request.params.projectId
    findById(reportId)
      .then((report) => {
        if (!report) {
          return response.status(404).json({ error: 'Report not found' })
        }

        const project = report.projects.find(
          (project) => project.id === projectId
        )

        // If the project doesn't exist, return a 404 error
        if (!project) {
          return response.status(404).json({ error: 'Project not found' })
        }

        response.json(project.expenses)
      })
      .catch((error) => next(error))
  }
)

expensesRouter.get(
  '/:reportId/projects/:projectId/expenses/:expenseId',
  async (request, response, next) => {
    const reportId = request.params.reportId
    const projectId = request.params.projectId
    const expenseId = request.params.expenseId

    findById(reportId)
      .then((report) => {
        // If the report doesn't exist, return a 404 error
        if (!report) {
          return response.status(404).json({ error: 'Report not found' })
        }

        const project = report.projects.find(
          (project) => project.id === projectId
        )

        // If the project doesn't exist, return a 404 error
        if (!project) {
          return response.status(404).json({ error: 'Project not found' })
        }

        const expense = project.expenses.find(
          (expense) => expense.id === expenseId
        )

        // Return the expense details
        response.json(expense)
      })
      .catch((error) => next(error))
  }
)

expensesRouter.delete(
  '/:reportId/projects/:projectId/expenses/:expenseId',
  (request, response, next) => {
    const reportId = request.params.reportId
    const projectId = request.params.projectId
    const expenseId = request.params.expenseId

    findById(reportId)
      .then((report) => {
        // If the report doesn't exist, return a 404 error
        if (!report) {
          return response.status(404).json({ error: 'Report not found' })
        }

        const project = report.projects.find(
          (project) => project.id === projectId
        )

        // If the project doesn't exist, return a 404 error
        if (!project) {
          return response.status(404).json({ error: 'Project not found' })
        }

        // Filter out the expense to delete
        const updatedProject = {
          ...project,
          expenses: project.expenses.filter(
            (expense) => expense.id !== expenseId
          ),
        }

        report.projects = report.projects.map((project) =>
          project.id === projectId ? updatedProject : project
        )

        report
          .save()
          .then(() => {
            response.status(204).end()
          })
          .catch((error) => next(error))
      })
      .catch((error) => next(error))
  }
)

expensesRouter.post(
  '/:reportId/projects/:projectId/expenses/',
  (request, response, next) => {
    const reportId = request.params.reportId
    const projectId = request.params.projectId

    findById(reportId)
      .then((report) => {
        if (!report) {
          return response.status(404).json({ error: 'Report not found' })
        }

        const project = report.projects.find(
          (project) => project.id === projectId
        )

        // If the project doesn't exist, return a 404 error
        if (!project) {
          return response.status(404).json({ error: 'Project not found' })
        }

        const newExpense = request.body // Capture the expense data from the request body

        // Filter out the expense to delete
        const updatedProject = {
          ...project,
          expenses: [...project.expenses, newExpense],
        }

        report.projects = report.projects.map((project) =>
          project.id === projectId ? updatedProject : project
        )

        // Save the report with the new project
        report
          .save()
          .then((updatedReport) => {
            const project = updatedReport.projects.find(
              (project) => project.id === projectId
            )

            // Respond with the newly added expense
            const addedExpense = project.expenses[project.expenses.length - 1]

            response.status(201).json(addedExpense)
          })
          .catch((error) => next(error))
      })
      .catch((error) => next(error))
  }
)

expensesRouter.put(
  '/:reportId/projects/:projectId/expenses/:expenseId',
  (request, response, next) => {
    const reportId = request.params.reportId
    const projectId = request.params.projectId
    const expenseId = request.params.expenseId

    findById(reportId)
      .then((report) => {
        if (!report) {
          return response.status(404).json({ error: 'Report not found' })
        }

        const project = report.projects.find(
          (project) => project.id === projectId
        )

        // If the project doesn't exist, return a 404 error
        if (!project) {
          return response.status(404).json({ error: 'Project not found' })
        }

        const updatedExpense = request.body // Capture the expense data from the request body

        const updatedExpenses = project.expenses.map((expense) =>
          expense.id === expenseId ? updatedExpense : expense
        )

        // Update the expenses
        const updatedProject = {
          ...project,
          expenses: updatedExpenses,
        }

        // Update the projects
        report.projects = report.projects.map((project) =>
          project.id === projectId ? updatedProject : project
        )

        report
          .save()
          .then((updatedReport) => {
            const project = updatedReport.projects.find(
              (project) => project.id === projectId
            )

            // Respond with the newly added expense
            const expense = project.expenses.find(
              (expense) => expense.id === expenseId
            )

            response.status(200).json(expense)
          })
          .catch((error) => next(error))
      })
      .catch((error) => next(error))
  }
)

export default expensesRouter
