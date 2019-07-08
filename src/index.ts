import * as BodyParser from "body-parser";
import * as SwaggerUI from "swagger-ui-express";
import express from "express";

import { addTimestampsToDebugLogging } from "./lib/quality";

import { logger } from "./middleware/debug-logger";

import { alive } from "./route/alive";
import { event } from "./route/event";
import { user } from "./route/user";

import { defaultRoute } from "./route/default-route";

import { specs } from "./swagger-spec";

// Do all the general project quality items
addTimestampsToDebugLogging();

const app = express();

// Add some quality of (code) life items
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(BodyParser.json({ type: "application/vnd.api+json" }));

// Add the middleware (if any)
app.use(logger);

// Add the routes
app.use(alive());
app.use(event());
app.use(user());


// Add SWAGGER (do NOT do in production!)
const swaggerOptions = {
  explorer: false,

  // so not intuitive, bad library design!
  swaggerOptions: {
    // can also be a function
    apisSorter: "alpha",
    // can also be 'alpha' or a function
    operationsSorter : "method",
  },
};
app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(specs, swaggerOptions));

// Default route that always sends a HTTP Status Code 404 (not found)
app.use(defaultRoute);

const port = process.env.PORT || 3000;

// Add a server key (magic!)
const server = app.listen(port, () => {
  console.log(`Server is listening for connections on ${port}`);
});

// This is to enable integration testing
export { app, server };
