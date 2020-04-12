import { IStringableTokenizer } from "../../../../shared/interfaces/IStringableTokenizer";
import { RegExpTokenizer } from "../../../../shared/tokenizers/RegExpTokenizer";
import { Url } from "../model/url";
import { EmailAddressValidator } from "../validators/email-address-validator";
import { UrlValidator } from "../validators/url-validator";

export class UrlTokenizer
  extends RegExpTokenizer<Url>
  implements IStringableTokenizer<Url> {

  validator = new UrlValidator();
  entityFactory = a => new Url(a);
  filter = x => !(new EmailAddressValidator().validate(x.entity.toString())); // Filter out email addresses

}
