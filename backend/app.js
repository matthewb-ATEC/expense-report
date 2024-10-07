const express = require("express");
const app = express();
const cors = require("cors");
const reportsRouter = require("./controllers/reports");
const projectsRouter = require("./controllers/projects");
const settingsRouter = require("./controllers/settings");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB.", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/reports", reportsRouter);
app.use("/api/reports", projectsRouter);
app.use("/api/settings", settingsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
