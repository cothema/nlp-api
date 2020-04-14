import { IStringable } from "./IStringable";

export interface IValidator<T = IStringable> {
  validate(candidate: T): boolean;
}
