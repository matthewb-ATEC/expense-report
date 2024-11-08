import express from 'express'
const settingsRouter = express.Router()
import Settings from '../models/settings.js'

settingsRouter.get('/', (request, response, next) => {
  Settings.findOne()
    .then((settings) => {
      response.status(200).json(settings)
    })
    .catch((error) => next(error))
})

settingsRouter.put('/', (request, response, next) => {
  const newSettings = request.body

  // Find the existing settings document and update it with the new settings
  Settings.findOneAndUpdate({}, newSettings, { new: true, upsert: true })
    .then((updatedSettings) => {
      response.status(200).json(updatedSettings) // Send the updated settings as the response
    })
    .catch((error) => next(error))
})

export default settingsRouter
