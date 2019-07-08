/**
 * @swagger
 *
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         description: Must be unique system wide
 *         type: string
 *       password:
 *         description: The password for this user
 *         type: string
 *       phone:
 *         description: Optional, if given must be in the form of '###-###-####'
 *         type: string
 */

import * as express from "express";

import { UserController } from "../controller/user-controller";

export function user() {
  const router = express.Router();

  /**
   * @swagger
   * /login:
   *    post:
   *      description: Login to the system with an existing user
   *      parameters:
   *        - name: user
   *          description: User object
   *          in: body
   *          required: true
   *          schema:
   *            $ref: '#/definitions/User'
   *      responses:
   *        200:
   *          description: The user was successfully logged in
   *        401:
   *          description: |
   *            The user was not logged in due to an error.
   *            * no_user_found If there is no user associated with the given email
   *            * invalid_password If the given user object has an invalid password
   */
  router.post("/login", UserController.getInstance().login);

  /**
   * @swagger
   * /user:
   *    post:
   *      description: Create a new user in the system
   *      parameters:
   *        - name: user
   *          description: User object
   *          in: body
   *          required: true
   *          schema:
   *            $ref: '#/definitions/User'
   *      responses:
   *        201:
   *          description: The user was successfully created
   *        400:
   *          description: |
   *            The user was not created due to an error.
   *            * email_already_taken If the given email already exists in the system
   *            * email_required If the given user object does not contain an email
   *            * email_empty If the given user object has an empty email
   *            * email_invalid If the given user object has an email that does not appear valid
   *            * invalid_phone_format If a phone number was provided that is not in the format '###-###-####'
   */
  router.post("/user", UserController.getInstance().createUser);

  return router;
}
