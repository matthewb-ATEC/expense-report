const express = require("express");
const fs = require("fs"); // used for config file management
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

app.get("/api/projects", (request, response) => {
  response.json(projects);
});

app.delete("/api/projects/:id", (request, response, next) => {
  const id = request.params.id;

  // Filter out the project to delete
  projects = projects.filter((project) => project.id !== id);

  response.status(204).end();
});

app.post("/api/projects", (request, response) => {
  const project = request.body;

  if (!project.id) {
    project.id = (projects.length + 1).toString(); // Simple id generation
  }

  projects.push(project);
  response.status(201).json(project);
});

app.put("/api/projects/:id", (request, response, next) => {
  const updatedProject = request.body;
  const id = request.params.id;

  // Find the project to update
  projects = projects.map((project) =>
    project.id === id ? updatedProject : project
  );

  response.status(200).json(updatedProject);
});

// Settings endpoints
app.get("/api/settings", (request, response) => {
  console.log("Fetching settings");
  fs.readFile("./settings.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading settings file:", err);
      return response
        .status(500)
        .json({ error: "Could not read settings file" });
    }

    // Parse the JSON content and return it
    try {
      const settings = JSON.parse(data);
      response.json(settings);
    } catch (parseError) {
      console.error("Error parsing settings file:", parseError);
      response.status(500).json({ error: "Could not parse settings file" });
    }
  });
});

app.post("/api/settings", (request, response) => {
  const settingsData = JSON.stringify(request.body, null, 2);
  try {
    fs.writeFileSync("./settings.json", settingsData); // Write the string to the file
    response.status(200).send("Settings saved successfully!");
  } catch (err) {
    console.error("Error writing settings file:", err);
    response.status(500).json({ error: "Could not save settings file" });
  }
  response.send("Settings saved successfully!");
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
