import { test, describe, beforeEach, expect, afterAll } from 'vitest'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../../src/app.js'
import Report from '../../src/models/report.js'
import helper from './helper.js'

const api = supertest(app)

beforeEach(async () => {
  await Report.deleteMany({})
  const reportObjects = helper.initialReports.map(
    (report) => new Report(report),
  )
  const promiseArray = reportObjects.map((report) => report.save())
  await Promise.all(promiseArray)
})

describe('reports', () => {
  describe('get', () => {
    test('reports are returned as json', async () => {
      const response = await api
        .get('/api/reports')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.length, helper.initialReports.length)
    })

    test('has a unique identifier property named id', async () => {
      const response = await api
        .get('/api/reports')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const reports = response.body

      reports.forEach((report) => {
        expect(report.id, 'Report object does not have an `id` property')
        expect(typeof report.id, 'string', '`id` is not of type string')
      })
    })

    test('report is returned with accurate data', async () => {
      const reports = await helper.reportsInDb()

      const response = await api
        .get(`/api/reports/${reports[0].id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body, reports[0])
    })
  })

  describe('post', () => {
    test('creating a new report increases the number of reports', async () => {
      await api
        .post('/api/reports')
        .send(helper.newReport)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await helper.reportsInDb()

      expect(response.length, helper.initialReports.length + 1)
    })

    test('creates new report with accurate information', async () => {
      const response = await api
        .post('/api/reports')
        .send(helper.newReport)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const responseReport = {
        user: response.body.user,
        projects: response.body.projects,
      }

      expect(responseReport, helper.newReport)
    })
  })

  describe('put', () => {
    test('updating a report doesnt change the number of reports', async () => {
      const reports = await helper.reportsInDb()

      await api
        .put(`/api/reports/${reports[0].id}`)
        .send(helper.changedReport)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const response = await helper.reportsInDb()

      expect(response.length, helper.initialReports.length)
    })

    test('updating report returns accurate information', async () => {
      const reports = await helper.reportsInDb()

      const response = await api
        .put(`/api/reports/${reports[0].id}`)
        .send(helper.changedReport)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const responseReport = {
        user: response.body.user,
        projects: response.body.projects,
      }

      expect(responseReport, helper.changedReport)
    })

    test('updating a report that doesnt exist throws an error', async () => {
      const reports = await helper.reportsInDb()

      await api.delete('/api/reports/').expect(204)
      const eletionResponse = await helper.reportsInDb()
      expect(eletionResponse.length, 0)

      const response = await api
        .put(`/api/reports/${reports[0].id}`)
        .send(helper.changedReport)
        .expect(404)

      expect(response.text).toBe('Report not found')
    })
  })

  describe('delete', () => {
    test('removing all reports sets the number of reports to zero', async () => {
      await api.delete('/api/reports/').expect(204)

      const response = await helper.reportsInDb()

      expect(response.length, 0)
    })

    test('removing a report reduces the number of reports', async () => {
      const reports = await helper.reportsInDb()

      await api.delete(`/api/reports/${reports[0].id}`).expect(204)

      const response = await helper.reportsInDb()

      expect(response.length, helper.initialReports.length - 1)
    })
  })
})

describe('projects', () => {
  describe('get', () => {
    test('projects are returned as json', async () => {
      const reports = await helper.reportsInDb()

      const response = await api
        .get(`/api/reports/${reports[0].id}/projects`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.length, reports[0].projects.length)
    })

    test('has a unique identifier property named id', async () => {
      const reports = await helper.reportsInDb()

      const response = await api
        .get(`/api/reports/${reports[0].id}/projects`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const projects = response.body

      projects.forEach((project) => {
        expect(project.id, 'Project object does not have an `id` property')
        expect(typeof project.id, 'string', '`id` is not of type string')
      })
    })

    test('projects returned with accurate data', async () => {
      const reports = await helper.reportsInDb()

      const response = await api
        .get(`/api/reports/${reports[0].id}/projects`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body, reports[0].projects)
    })

    test('project returned with accurate data', async () => {
      const reports = await helper.reportsInDb()

      const response = await api
        .get(
          `/api/reports/${reports[0].id}/projects/${reports[0].projects[0].id}`,
        )
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body, reports[0].projects[0])
    })

    test('an error is thrown if the report does not exist', async () => {
      const reports = await helper.reportsInDb()

      await api.delete(`/api/reports/${reports[0].id}`).expect(204)

      const response = await api
        .get(`/api/reports/${reports[0].id}/projects`)
        .expect(404)

      expect(response.body.error).toBe('Report not found')
    })
  })

  describe('post', () => {
    test('creating a new project increases the number of projects', async () => {
      const reportsBefore = await helper.reportsInDb()

      await api
        .post(`/api/reports/${reportsBefore[0].id}/projects`)
        .send(helper.newProject)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const reportsAfter = await helper.reportsInDb()

      expect(
        reportsAfter[0].projects.length,
        reportsBefore[0].projects.length + 1,
      )
    })

    test('creates new project with accurate information', async () => {
      const reports = await helper.reportsInDb()

      const response = await api
        .post(`/api/reports/${reports[0].id}/projects`)
        .send(helper.newProject)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const responseProject = {
        number: response.body.number,
        name: response.body.name,
        expenses: response.body.expenses,
      }

      expect(responseProject, helper.newProject)
    })
  })

  describe('put', () => {
    test('updating a project doesnt change the number of projects', async () => {
      const reportsBefore = await helper.reportsInDb()

      await api
        .put(
          `/api/reports/${reportsBefore[0].id}/projects/${reportsBefore[0].projects[0].id}`,
        )
        .send(helper.changedProject)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const reportsAfter = await helper.reportsInDb()

      expect(
        reportsAfter[0].projects[0].length,
        reportsBefore[0].projects.length,
      )
    })

    test('updating project returns accurate information', async () => {
      const reports = await helper.reportsInDb()

      const response = await api
        .put(`/api/reports/${reports[0].id}`)
        .send(helper.changedProject)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const responseProject = {
        number: response.body.number,
        name: response.body.name,
        expenses: response.body.expenses,
      }

      expect(responseProject, helper.changedProject)
    })
  })

  describe('delete', () => {
    test('removing a project reduces the number of projects', async () => {
      const reportsBefore = await helper.reportsInDb()

      await api
        .delete(
          `/api/reports/${reportsBefore[0].id}/projects/${reportsBefore[0].projects[0].id}`,
        )
        .expect(204)

      const reportsAfter = await helper.reportsInDb()

      expect(
        reportsAfter[0].projects.length,
        reportsBefore[0].projects.length - 1,
      )
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
