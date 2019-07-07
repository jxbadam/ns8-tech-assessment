import { Created } from "../model/created"

export class BaseDao<T extends Created> {
  private idSequence: number;

  private db: T[];

  protected constructor() {
    this.idSequence = 1;
    this.db = new Array();
  }

  public save(item: T): T {
    const id = this.getNextId();
    item.setId(id);
    item.setCreated((new Date()).getTime());

    this.db.push(item);

    return item;
  }

  protected getDb(): T[] {
    return this.db;
  }

  protected getNextId(): number {
    const id = this.idSequence;
    this.idSequence ++;
    return id;
  }
}
