import * as express from "express";

import { UserDao } from "../dao/user-dao";
import { BaseController } from "../lib/controller/base-controller";
import { User } from "../model/user";
import { UserValidator } from "../validator/user-validator";

export class UserController extends BaseController {

  public static getInstance(): UserController {
    if (this.singleton == null) {
      this.singleton = new UserController();
    }
    return this.singleton;
  }

  private static singleton: UserController;

  constructor() {
    super();
  }

  public createUser(request: express.Request, response: express.Response, next): void {
    const email = request.body.email;
    const password = request.body.password;
    const phone = request.body.phone;

    let user: User = UserDao.getInstance().findByEmail(email);
    if (user != null) {
      const errors = super.getErrorObject(["email_already_taken"]);
      super.sendError(response, 400, errors);
      return;
    }

    // validate and then create
    user = new User(email, password, phone);
    const validator: UserValidator = new UserValidator();
    const errorCode = validator.validate(user);

    // validation failed
    if (errorCode != null) {
      const errors = super.getErrorObject([errorCode]);
      super.sendError(response, 400, errors);
      return;
    }

    user = UserDao.getInstance().save(user);

    // after successful create we are logged in
    UserDao.getInstance().setCurrentUser(user);

    response.status(201).json(user);
  }

  public login(request: express.Request, response: express.Response, next): void {
    const email = request.body.email;
    const password = request.body.password;

    let user: User = UserDao.getInstance().findByEmail(email);

    if (user == null) {
      const errors = super.getErrorObject(["no_user_found"]);
      super.sendError(response, 401, errors);
      return;
    }

    if (user != null) {
      if (user.getPassword() !== password) {
        const errors = super.getErrorObject(["invalid_password"]);
        super.sendError(response, 401, errors);
        return;
      }
    }

    UserDao.getInstance().setCurrentUser(user);
    response.status(200).json(user);
  }
}
