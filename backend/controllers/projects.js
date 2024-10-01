const projectsRouter = require("express").Router();

let projects = [];

projectsRouter.get("/", (request, response) => {
  response.json(projects);
});

projectsRouter.delete("/:id", (request, response, next) => {
  const id = request.params.id;

  // Filter out the project to delete
  projects = projects.filter((project) => project.id !== id);

  response.status(204).end();
});

projectsRouter.post("/", (request, response) => {
  const project = request.body;

  if (!project.id) {
    project.id = (projects.length + 1).toString(); // Simple id generation
  }

  projects.push(project);
  response.status(201).json(project);
});

projectsRouter.put("/:id", (request, response, next) => {
  const updatedProject = request.body;
  const id = request.params.id;

  // Find the project to update
  projects = projects.map((project) =>
    project.id === id ? updatedProject : project
  );

  response.status(200).json(updatedProject);
});

module.exports = projectsRouter;
