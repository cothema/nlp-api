import { IStringable } from "../../../../interface/i-stringable";

export class CsSimplePhoneValidator {
  validate(input: IStringable): boolean {
    for (const inputElement of input.toString()) {

    }
    return true;
  }
}
