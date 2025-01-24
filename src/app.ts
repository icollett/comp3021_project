import { Server } from "http";
import express, { Express } from "express";
import morgan from "morgan";

// import setupSwagger endpoint
import setupSwagger from "../config/swagger";

// initialize the express application
const app: Express = express();

// setup swagger for api documentation
setupSwagger(app);

app.use(morgan("combined"));
app.use(express.json());

// respond to GET request at endpoint "/" with message
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// initialize port as either string read from .env, or 3000 by default
const PORT: string | 3000 = process.env.PORT || 3000;

// initialize server for the application to listen for requests on the specified port
const server: Server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`
    );
});

// export app and server for testing
export default app;