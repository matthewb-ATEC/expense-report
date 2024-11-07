const reportsRouter = require('express').Router()
import Report, {
  find,
  findById,
  findByIdAndUpdate,
  deleteMany,
} from '../models/report'

reportsRouter.get('/', (request, response, next) => {
  find({})
    .then((reports) => {
      response.json(reports)
    })
    .catch((error) => next(error))
})

reportsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id

  findById(id)
    .then((report) => {
      response.json(report)
    })
    .catch((error) => next(error))
})

reportsRouter.post('/', (request, response, next) => {
  const report = new Report(request.body)

  report
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((error) => next(error))
})

reportsRouter.put('/:id', (request, response, next) => {
  const id = request.params.id

  findByIdAndUpdate(id, request.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedReport) => {
      if (!updatedReport) {
        return response.status(404).send('Report not found')
      }
      response.status(200).json(updatedReport)
    })
    .catch((error) => next(error))
})

reportsRouter.delete('/', (request, response, next) => {
  deleteMany({})
    .then((result) => {
      response.status(200).json({
        message: 'All reports deleted',
        deletedCount: result.deletedCount,
      })
    })
    .catch((error) => next(error))
})

export default reportsRouter
