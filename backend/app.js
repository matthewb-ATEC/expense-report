import express from 'express'
const app = express()
import cors from 'cors'
import reportsRouter from './controllers/reports'
import projectsRouter from './controllers/projects'
import expensesRouter from './controllers/expenses'
import settingsRouter from './controllers/settings'
import { MONGODB_URI } from './utils/config'
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from './utils/middleware'
import { info, error as _error } from './utils/logger'
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

app.use('/api/reports', reportsRouter)
app.use('/api/reports', projectsRouter)
app.use('/api/reports', expensesRouter)
app.use('/api/settings', settingsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
