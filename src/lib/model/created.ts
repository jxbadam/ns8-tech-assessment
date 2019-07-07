import { Identified } from "./identified";

export class Created extends Identified {
  private created: number;

  public constructor(id?: number, created?: number) {
    super(id);

    if (created == null) {
      created = (new Date()).getTime();
    }
    this.created = created;
  }

  public setCreated(created: number) {
    this.created = created;
  }

  public getCreated(): number {
    return this.created;
  }
}
