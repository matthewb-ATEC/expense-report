const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
  id: String,
  file: { type: mongoose.Schema.Types.Mixed, default: null }, // Use Mixed type for files
  text: String,
});

module.exports = attachmentSchema;
