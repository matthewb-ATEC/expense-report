import { test, after, describe, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../../src/app.js'
import Report from '../../src/models/report.js'
import test_helper from './test_helper.js'

const api = supertest(app)

describe('report', () => {
  beforeEach(async () => {
    await Report.deleteMany({})
    const reportObjects = test_helper.initialReports.map(
      (report) => new Report(report),
    )
    const promiseArray = reportObjects.map((report) => report.save())
    await Promise.all(promiseArray)
  })

  test('reports are returned as json', async () => {
    await api
      .get('/api/reports')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})
