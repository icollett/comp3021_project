import { Server } from "http";
import express, { Express } from "express";
import morgan from "morgan";

// import setupSwagger endpoint
import setupSwagger from "../config/swagger";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

// initialize the express application
const app: Express = express();

// setup swagger for api documentation
setupSwagger(app);

app.use(morgan("combined"));
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

// initialize port as either string read from .env, or 3000 by default
const PORT: string | 3000 = process.env.PORT || 3000;

// initialize server for the application to listen for requests on the specified port
const server: Server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`
    );
});

// export app and server for testing
export {app, server};