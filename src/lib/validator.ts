export interface IValidator<T> {
  validate(item: T): string;
}
