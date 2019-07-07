export class Identified {
  private id: number;

  public constructor(id?: number) {
    this.id = id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }
}
