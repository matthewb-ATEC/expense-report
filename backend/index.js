const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
app.use(requestLogger);

let projects = [];

app.get("/projects", (request, response) => {
  response.json(projects);
});

app.delete("/projects/:id", (request, response, next) => {
  const id = request.params.id;

  // Filter out the project to delete
  projects = projects.filter((project) => project.id !== id);

  response.status(204).end();
});

app.post("/projects", (request, response) => {
  const project = request.body;

  if (!project.id) {
    project.id = (projects.length + 1).toString(); // Simple id generation
  }

  projects.push(project);
  response.status(201).json(project);
});

app.put("/projects/:id", (request, response, next) => {
  const updatedProject = request.body;
  const id = request.params.id;

  // Find the project to update
  projects = projects.map((project) =>
    project.id === id ? updatedProject : project
  );

  response.status(200).json(updatedProject);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
