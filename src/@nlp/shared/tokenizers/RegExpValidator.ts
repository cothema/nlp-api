import { IRegExpValidator } from "../interfaces/IRegExpValidator";
import { IStringable } from "../interfaces/IStringable";

export class RegExpValidator implements IRegExpValidator {
  public regExp: RegExp;

  public validate(candidate: IStringable): boolean {
    const regExp = this.regExp.exec(candidate.toString());

    return (
      regExp &&
      regExp.index === 0 &&
      regExp[0].length === candidate.toString().length
    );
  }
}
