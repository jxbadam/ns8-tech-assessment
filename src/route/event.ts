import * as express from "express";

import { EventController } from "../controller/event-controller";

export function event() {
  const router = express.Router();

  router.post("/event", EventController.getInstance().createEvent);

  router.get("/event/user", EventController.getInstance().getEventsForUser);

  router.get("/event/range", EventController.getInstance().getEventsForTimeRange);

  router.get("/event", EventController.getInstance().getAllEvents);

  return router;
}
