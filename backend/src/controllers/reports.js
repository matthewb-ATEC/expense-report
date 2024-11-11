import express from 'express'
const reportsRouter = express.Router()
import Report from '../models/report.js'

reportsRouter.get('/', async (request, response) => {
  const reports = await Report.find({})
  if (!reports) return response.status(404).json({ error: 'Reports not found' })
  response.json(reports).status(200)
})

reportsRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  const report = await Report.findById(id)
  if (!report) return response.status(404).json({ error: 'Report not found' })
  response.json(report).status(200)
})

reportsRouter.post('/', async (request, response) => {
  const report = new Report(request.body)
  const newReport = await report.save()
  response.status(201).json(newReport)
})

reportsRouter.put('/:id', async (request, response) => {
  const id = request.params.id

  const updatedReport = await Report.findByIdAndUpdate(id, request.body, {
    new: true,
    runValidators: true,
  })

  if (!updatedReport) {
    return response.status(404).send('Report not found')
  }
  response.status(200).json(updatedReport)
})

reportsRouter.delete('/', async (request, response) => {
  await Report.deleteMany({})
  response.status(204).json({
    message: 'All reports deleted',
  })
})

reportsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Report.findByIdAndDelete(id)

  response.status(204).json({
    message: 'Report deleted',
  })
})

export default reportsRouter
