import * as express from "express";

export function logger(request: express.Request, response: express.Response, next) {
  const start: number = (new Date()).getTime();
  next();

  const total: number = ((new Date()).getTime() - start);

  const statusCode = response.statusCode;
  const output = `[${statusCode}] ${request.method} ${request.path} (${total}ms)`;

  if (statusCode === 200) {
    console.info(output);
  } else {
    console.error(output);
  }
}
