const mongoose = require('mongoose')
const projectSchema = require('../models/project').default
const userSchema = require('../models/user').default

const reportSchema = new mongoose.Schema({
  user: userSchema,
  projects: [projectSchema], // Use projectSchema for projects
})

reportSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Report = mongoose.model('Report', reportSchema)
module.exports = Report
