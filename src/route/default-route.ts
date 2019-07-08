/**
 * @swagger
 * /not-found:
 *    get:
 *      description: Default route always returns 404!
 *      responses:
 *        404:
 *          description: Always returns a 404, no matter what route is hit here)
 */

import * as express from "express";

export function defaultRoute(request: express.Request, response: express.Response, next) {
  response.status(404).send(request.originalUrl + ": not found");
}
