import { IStringable } from "../../../../shared/interfaces/i-stringable";
import { ITokenizer } from "../../../../shared/interfaces/i-tokenizer";
import { RegExpTokenizer } from "../../../../shared/tokenizers/reg-exp-tokenizer";
import { EmailAddress } from "../model/email-address";
import { EmailAddressValidator } from "../validators/email-address-validator";

export class EmailAddressTokenizer extends RegExpTokenizer implements ITokenizer<EmailAddress> {

  validator = new EmailAddressValidator();

  tokenize(input: IStringable): Array<EmailAddress> {
    return super.tokenize(input)
      .map(x => new EmailAddress(x));
  }
}
