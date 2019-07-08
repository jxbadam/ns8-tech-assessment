/**
 * @swagger
 *
 * definitions:
 *   Event:
 *     type: object
 *     required:
 *       - type
 *     properties:
 *       type:
 *         description: The type of the event, must be non-empty
 *         type: string
 */

import * as express from "express";

import { EventController } from "../controller/event-controller";

export function event() {
  const router = express.Router();

  /**
   * @swagger
   * /event:
   *    post:
   *      description: Create a new event in the system
   *      parameters:
   *        - name: event
   *          description: Event object
   *          in: body
   *          required: true
   *          schema:
   *            $ref: '#/definitions/Event'
   *      responses:
   *        201:
   *          description: The event was successfully created
   *        400:
   *          description: The event was not created due to an error
   */
  router.post("/event", EventController.getInstance().createEvent);

  /**
   * @swagger
   * /event/user:
   *    get:
   *      description: Get all events for a given user
   *      parameters:
   *        - name: userId
   *          description: The id of the user in the system
   *          in: query
   *          required: true
   *          type: number
   *      responses:
   *        200:
   *          description: A list of all events for the given user
   *        400:
   *          description: The given user id is invalid
   */
  router.get("/event/user", EventController.getInstance().getEventsForUser);

  /**
   * @swagger
   * /event/range:
   *    get:
   *      description: Get all events for a given range
   *      parameters:
   *        - name: start
   *          description: The starting time for events in UNIX Epoch Milliseconds
   *          in: query
   *          required: false
   *          type: number
   *        - name: end
   *          description: The ending time for events in UNIX Epoch Milliseconds
   *          in: query
   *          required: false
   *          type: number
   *      responses:
   *        200:
   *          description: A list of all events that occurred between start and end inclusive.
   *        400:
   *          description: |
   *            * start_required_if_end_present if end is given and not start
   *            * invalid_time_range If the given start time is after the given end time
   */
  router.get("/event/range", EventController.getInstance().getEventsForTimeRange);

  /**
   * @swagger
   * /event:
   *    get:
   *      description: Get all events that are in the system
   *      responses:
   *        200:
   *          description: A list of all events in the system since last restart
   */
  router.get("/event", EventController.getInstance().getAllEvents);

  return router;
}
