import { IStringable } from "../../../../shared/interfaces/i-stringable";
import { ITokenizer } from "../../../../shared/interfaces/i-tokenizer";
import { RegExpTokenizer } from "../../../../shared/tokenizers/reg-exp-tokenizer";
import { EmailAddress } from "../model/email-address";
import { PhoneNumber } from "../model/phone-number";
import { PhoneNumberValidator } from "../validators/phone-number-validator";

export class PhoneNumberTokenizer extends RegExpTokenizer implements ITokenizer<EmailAddress> {

  validator = new PhoneNumberValidator();

  tokenize(input: IStringable): Array<PhoneNumber> {
    return super.tokenize(input)
      .map(x => new PhoneNumber(x));
  }
}
