import { IRegExpValidator } from "../interfaces/IRegExpValidator";
import { IStringable } from "../interfaces/IStringable";

export class RegExpValidator implements IRegExpValidator {
  public regExp: RegExp;

  public validate(candidate: IStringable): boolean {
    let out = false;
    let regExp;

    for (let i = 0; (regExp = this.regExp.exec(candidate.toString())); i++) {
      if (i > 0) {
        out = false;
        continue;
      }

      out =
        regExp &&
        regExp.index === 0 &&
        regExp[0].length === candidate.toString().length;
    }

    return out;
  }
}
