import { Schema, model } from 'mongoose'

const settingsSchema = new Schema({
  mileageRate: Number,
  perDiem: {
    breakfast: Number,
    lunch: Number,
    dinner: Number,
  },
  projects: [
    {
      name: String,
      number: Number,
    },
  ],
  costCodes: [
    {
      category: String,
      costCode: String,
    },
  ],
})

settingsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Remove the _id field
    delete returnedObject._id
    delete returnedObject.__v

    // Remove _id from nested 'projects' array
    if (returnedObject.projects) {
      returnedObject.projects.forEach((project) => {
        delete project._id
      })
    }

    // Remove _id from nested 'costCodes' array
    if (returnedObject.costCodes) {
      returnedObject.costCodes.forEach((costCode) => {
        delete costCode._id
      })
    }
  },
})

const Settings = model('Settings', settingsSchema)
export default Settings
