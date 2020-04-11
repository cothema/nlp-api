import { IStringable } from "../../../../shared/interfaces/i-stringable";
import { ITokenizer } from "../../../../shared/interfaces/i-tokenizer";
import { RegExpTokenizer } from "../../../../shared/tokenizers/reg-exp-tokenizer";
import { EmailAddress } from "../model/email-address";
import { Url } from "../model/url";
import { EmailAddressValidator } from "../validators/email-address-validator";
import { UrlValidator } from "../validators/url-validator";

export class UrlTokenizer extends RegExpTokenizer implements ITokenizer<EmailAddress> {

  validator = new UrlValidator();

  tokenize(input: IStringable): Array<Url> {
    return super.tokenize(input)
      .map(x => new Url(x))
      .filter(x => !(new EmailAddressValidator().validate(x.toString()))); // Filter out email addresses
  }
}
