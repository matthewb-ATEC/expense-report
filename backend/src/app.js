import express from 'express'
const app = express()
import cors from 'cors'
import 'express-async-errors'
import reportsRouter from './controllers/reports.js'
import projectsRouter from './controllers/projects.js'
import expensesRouter from './controllers/expenses.js'
import settingsRouter from './controllers/settings.js'
import testingRouter from './controllers/testing.js'
import { MONGODB_URI } from './utils/config.js'
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from './utils/middleware.js'
import { info, error as _error } from './utils/logger.js'
import { set, connect } from 'mongoose'

set('strictQuery', false)

//logger.info("connecting to", config.MONGODB_URI);

connect(MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((error) => {
    _error('error connecting to MongoDB.', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.get('/health', (req, res) => {
  res.send('ok')
})

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use('/api/reports', reportsRouter)
app.use('/api/reports', projectsRouter)
app.use('/api/reports', expensesRouter)
app.use('/api/settings', settingsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
