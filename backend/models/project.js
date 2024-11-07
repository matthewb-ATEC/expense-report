import { Schema } from 'mongoose'
import expenseSchema from '../models/expense'

const projectSchema = new Schema({
  number: { type: Number, default: undefined },
  name: String,
  description: String,
  expenses: [expenseSchema], // Use expenseSchema for expenses
})

projectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    //delete returnedObject._id;
    delete returnedObject.__v
  },
})

export default projectSchema
