import { IStringable } from "./i-stringable";
import { IValidator } from "./i-validator";

export interface IRegExpValidator<T = IStringable> extends IValidator {
  regExp: RegExp;
}
