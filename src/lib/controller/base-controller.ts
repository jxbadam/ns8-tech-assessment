import * as express from "express";

import { ErrorObject } from "../model/error-object";

export class BaseController {

  constructor() {
  }

  protected getErrorObject(errors: string[]): ErrorObject {
    return {
      errors,
    }
  }

  protected sendError(response: express.Response, statusCode: number, errors: ErrorObject): void {
    response.status(statusCode).json(errors);
  }

}
