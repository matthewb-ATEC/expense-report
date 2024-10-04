const mongoose = require("mongoose");
const expenseSchema = require("../models/expense");

const projectSchema = new mongoose.Schema({
  id: String,
  number: { type: Number, default: undefined },
  name: String,
  description: String,
  expenses: [expenseSchema], // Use expenseSchema for expenses
});

module.exports = projectSchema;
