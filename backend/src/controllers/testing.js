import express from 'express'
const testingRouter = express.Router()
import Report from '../models/report.js'

testingRouter.post('/reset', async (request, response) => {
  await Report.deleteMany({})

  response.status(204).end()
})

export default testingRouter
