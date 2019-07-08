/**
 * @swagger
 * /sys/alive:
 *    get:
 *      description: Returns information about the running server for use in application monitoring
 */

import * as express from "express";

export function alive() {
  const router = express.Router();

  router.get("/sys/alive", (request: express.Request, response: express.Response, next) => {
    response.send("Potentially employable person found, further investigation is warranted!");
  });

  return router;
}
