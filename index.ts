/**
 * External Modules
 */

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import crmRoutes from "./src/routes/crmRoutes";
import articleRoutes from "./src/routes/articleRoutes";

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

/**
 * Server Activation
 */

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));

crmRoutes(app);
articleRoutes(app);

app.get("/", (req: Request, res: Response) =>
  res.send(`Node and express server is running on port ${PORT}`)
);
