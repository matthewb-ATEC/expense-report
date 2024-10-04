const mongoose = require("mongoose");
const attachmentSchema = require("../models/attachment");

const expenseSchema = new mongoose.Schema({
  id: String,
  date: String,
  costCategory: String,
  costCode: String,
  cost: { type: Number, default: undefined },
  description: String,
  mileage: Number,
  purpose: String,
  fromLocation: String,
  toLocation: String,
  roundTrip: Boolean,
  breakfast: { type: Boolean, default: false },
  lunch: { type: Boolean, default: false },
  dinner: { type: Boolean, default: false },
  attachments: [attachmentSchema], // Use attachmentSchema for attachments
});

module.exports = expenseSchema;
