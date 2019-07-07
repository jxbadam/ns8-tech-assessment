
import * as express from "express";

export function defaultRoute(request: express.Request, response: express.Response, next) {
  response.status(404).send(request.originalUrl + ": not found");
}
