import { IStringable } from "../../../../shared/interfaces/i-stringable";

export class CsVowelValidator {
  validate(input: IStringable): boolean {
    for (const inputElement of input.toString()) {

    }
    return true;
  }
}
