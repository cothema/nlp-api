import { IRegExpValidator } from "../interfaces/i-reg-exp-validator";
import { IStringable } from "../interfaces/i-stringable";

export class RegExpValidator implements IRegExpValidator {

  regExp: RegExp;

  validate(candidate: IStringable): boolean {
    const regExp = this.regExp.exec(candidate.toString());

    return regExp && regExp.index === 0 && regExp[0].length === candidate.toString().length;
  }
}
