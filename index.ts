/**
 * External Modules
 */

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { crmRouter } from "./src/routes/crmRoutes";
import { articleRouter } from "./src/routes/articleRoutes";
import { errorHandler } from "./src/middleware/error.middleware";
import { notFoundHandler } from "./src/middleware/not-found.middleware";

dotenv.config();
/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
// mongoose connection
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/BlogMvc")
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err: Error) => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    process.exit();
  });
//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use(crmRouter);
app.use(articleRouter);

// Error Handlers
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */
app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));

app.get("/", (req: Request, res: Response) =>
  res.send(`Node and express server is running on port ${PORT}`)
);
