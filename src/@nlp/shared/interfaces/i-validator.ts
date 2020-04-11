import { IStringable } from "./i-stringable";

export interface IValidator<T = IStringable> {
  validate(candidate: T): boolean;
}
