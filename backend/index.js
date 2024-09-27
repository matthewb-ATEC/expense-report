const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.static("dist"));

let projects = [];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/projects", (request, response) => {
  response.json(projects);
});

app.put("/projects", (request, response) => {
  const updatedProjects = request.body;
  projects = updatedProjects;
  response.json(projects);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
