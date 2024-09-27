const projectsRouter = require("express").Router();
import { find, save } from "../models/project";

projectsRouter.get("/", (request, response) => {
  find({}).then((projects) => {
    response.json(projects);
  });
});

projectsRouter.post("/", (request, response) => {
  const project = new project(request.body);

  save().then((result) => {
    response.status(201).json(result);
  });
});

export default projectsRouter;
