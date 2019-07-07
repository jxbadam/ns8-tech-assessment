import * as express from "express";

import { UserController } from "../controller/user-controller";

export function user() {
  const router = express.Router();

  router.post("/login", UserController.getInstance().login);
  router.post("/user", UserController.getInstance().createUser);

  return router;
}
