import { IStringable } from "../../../../shared/interfaces/IStringable";

export class CsVowelValidator {
  public validate(input: IStringable): boolean {
    for (const inputElement of input.toString()) {
    }
    return true;
  }
}
