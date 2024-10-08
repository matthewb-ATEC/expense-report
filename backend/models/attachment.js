const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
  file: { type: mongoose.Schema.Types.Mixed, default: null }, // Use Mixed type for files
  text: String,
});

attachmentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    //delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = attachmentSchema;
