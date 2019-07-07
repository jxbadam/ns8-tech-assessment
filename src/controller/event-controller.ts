import * as express from "express";

import { EventDao } from "../dao/event-dao";
import { UserDao } from "../dao/user-dao";
import { BaseController } from "../lib/controller/base-controller";
import { Event } from "../model/event";
import { EventValidator } from "../validator/event-validator";

export class EventController extends BaseController {

  public static getInstance(): EventController {
    if (this.singleton == null) {
      this.singleton = new EventController();
    }
    return this.singleton;
  }

  private static singleton: EventController;

  constructor() {
    super();
  }

  public createEvent(request: express.Request, response: express.Response, next): void {
    const type: string = request.body.type;
    const userId: number = UserDao.getInstance().getCurrentUserId();

    if (userId == null) {
      const errors = super.getErrorObject(["not_logged_in"]);
      super.sendError(response, 400, errors);
      return;
    }

    let event: Event = new Event(type, userId);
    const validator: EventValidator = new EventValidator();
    const errorCode = validator.validate(event);

    if (errorCode != null) {
      const errors = super.getErrorObject([errorCode]);
      super.sendError(response, 400, errors);
      return;
    }

    event = EventDao.getInstance().save(event);

    response.status(200).json(event);
  }

  public getEventsForTimeRange(request: express.Request, response: express.Response, next) {
    const start: number = (request.query.start) ? Number(request.query.start) : undefined;
    const end: number = (request.query.end) ? Number(request.query.end) : undefined;

    if (end != null && start == null) {
      const errors = super.getErrorObject(["start_required_if_end_present"]);
      super.sendError(response, 400, errors);
      return;
    }

    if ((end != null) && (start != null) && (start > end)) {
      const errors = super.getErrorObject(["invalid_time_range"]);
      super.sendError(response, 400, errors);
      return;
    }

    const events = EventDao.getInstance().getEventsForTimeRange(start, end);
    response.status(200).json(events);
  }

  public getEventsForUser(request: express.Request, response: express.Response, next) {
    const userId: number = (request.query.userId != null) ? Number(request.query.userId) : null;

    if (userId == null) {
      const errors = super.getErrorObject(["invalid_user"]);
      super.sendError(response, 400, errors);
      return;
    }

    const events = EventDao.getInstance().getEventsForUser(userId);
    response.status(200).json(events);
  }

  public getAllEvents(request: express.Request, response: express.Response, next) {
    const events = EventDao.getInstance().getAllEvents();
    response.status(200).json(events);
  }
}
