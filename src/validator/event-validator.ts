import { IValidator } from "../lib/validator";
import { Event } from "../model/event";

export class EventValidator implements IValidator<Event> {
  public validate(event: Event): string {
    if (event == null) {
      return "null_event";
      // throw new Error("Unable to validate event as the given event is either NULL or UNDEFINED!");
    }

    if (event.getType() == null) {
      return "invalid_event_type";
      // throw new Error("Given event has a NULL or UNDEFINED type and is therefore invalid!");
    }

    if (event.getType() === "") {
      return "empty_event_type";
      // throw new Error("Given event has a type that is an empty string, this is invalid!");
    }

    return null;
  }
}
