import { Schema, model } from 'mongoose'
import projectSchema from './project.js'
import userSchema from './user.js'

const reportSchema = new Schema({
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

const Report = model('Report', reportSchema)
export default Report
