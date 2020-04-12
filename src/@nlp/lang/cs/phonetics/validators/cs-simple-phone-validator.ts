import { IStringable } from "../../../../shared/interfaces/IStringable";

export class CsSimplePhoneValidator {
  validate(input: IStringable): boolean {
    for (const inputElement of input.toString()) {

    }
    return true;
  }
}
