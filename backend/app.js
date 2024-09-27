const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const testsRouter = require("./controllers/tests");

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/tests", testsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
