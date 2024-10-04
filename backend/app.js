const express = require("express");
const app = express();
const cors = require("cors");
const projectsRouter = require("./controllers/projects");
const settingsRouter = require("./controllers/settings");
const middleware = require("./utils/middleware");

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/projects", projectsRouter);
app.use("/api/settings", settingsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
