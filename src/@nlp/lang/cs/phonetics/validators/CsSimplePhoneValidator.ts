import { IStringable } from "../../../../shared/interfaces/IStringable";

export class CsSimplePhoneValidator {
  public validate(input: IStringable): boolean {
    for (const inputElement of input.toString()) {
    }
    return true;
  }
}
