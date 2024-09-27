import { MONGODB_URI } from "./utils/config";
import express, { json } from "express";
const app = express();
import cors from "cors";
//import blogsRouter from "./controllers/blogs";
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from "./utils/middleware";
import { info, error as _error } from "./utils/logger";
import { set, connect } from "mongoose";

set("strictQuery", false);

/*info("connecting to", MONGODB_URI);

connect(MONGODB_URI)
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((error) => {
    _error("error connecting to MongoDB:", error.message);
  });
*/
app.use(cors());
app.use(express.static("dist"));
app.use(json());
app.use(requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
