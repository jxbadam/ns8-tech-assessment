import { Created } from "../lib/model/created";

export class Event extends Created {
  private type: string;
  private userId: number;

  public constructor(type: string, userId: number) {
    super();
    this.type = type;
    this.userId = userId;
  }

  public getType(): string {
    return this.type;
  }

  public getUserId(): number {
    return this.userId;
  }
}
