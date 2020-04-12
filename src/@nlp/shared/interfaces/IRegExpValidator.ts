import { IStringable } from "./IStringable";
import { IValidator } from "./IValidator";

export interface IRegExpValidator<T = IStringable>
  extends IValidator {
  regExp: RegExp;
}
