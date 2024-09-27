import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  id: String,
  name: String,
  number: Number,
  //expenses: ExpenseSchema,
});

const Project = model("Project", projectSchema);

export default Project;
