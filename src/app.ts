import express, { Express } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

// import setupSwagger endpoint
import setupSwagger from "../config/swagger";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";

// initialize the express application
const app: Express = express();

app.use(helmet());
app.use(cors());
// setup swagger for api documentation
setupSwagger(app);

app.use(express.json());

/**
 * @openapi
 * /:
 *   get:
 *     summary: Hello world!
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: Hello World!
 */
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

/**
 * @openapi
 * /health:
 *  get:
 *   summary: Get health status of the application
 *   tags: [Health]
 *   responses:
 *    200:
 *     description: The application's status, uptime, the current timestamp, and version
 */
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
  // send JSON response with status, server uptime, current time, API version
});

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

app.use(errorHandler);

// export app and server for testing
export default app;