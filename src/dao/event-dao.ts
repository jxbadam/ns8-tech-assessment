import Debug from "debug";
const debug = Debug("CC:EventDao");

import { BaseDao } from "../lib/dao/base-dao";
import { Event } from "../model/event";

export class EventDao extends BaseDao<Event> {
  public static getInstance(): EventDao {
    if (this.singleton == null) {
      this.singleton = new EventDao();
    }
    return this.singleton;
  }

  private static singleton: EventDao;

  public getEventsForTimeRange(start?: number, end?: number) {
    if (start == null) {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      start = date.getTime();
    }

    if (end == null) {
      const date = new Date();
      end = date.getTime();
    }

    debug(`Getting events in range (start=${start}, end=${end})`);

    const events = new Array();

    const db = this.getDb();

    for (const current of db) {
      const created = current.getCreated();
      if ((start <= created) && (created <= end)) {
        events.push(current);
      }
    }

    return events;
  }

  public getEventsForUser(userId: number): Event[] {
    debug(`Getting Events for User ID [${userId}]`);

    const events = new Array();

    const db = this.getDb();

    for (const current of db) {
      if (current.getUserId() === userId) {
        events.push(current);
      }
    }

    return events;
  }

  public getAllEvents(): Event[] {
    const db = this.getDb();
    const events = new Array();
    for (const current of db) {
      events.push(current);
    }

    return events;
  }
}
