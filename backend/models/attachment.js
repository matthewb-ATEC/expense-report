import { Schema } from 'mongoose'

const attachmentSchema = new Schema({
  file: { type: Schema.Types.Mixed, default: null }, // Use Mixed type for files
  text: String,
})

attachmentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    //delete returnedObject._id;
    delete returnedObject.__v
  },
})

export default attachmentSchema
