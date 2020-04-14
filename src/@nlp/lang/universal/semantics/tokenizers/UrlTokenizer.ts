import { IStringableTokenizer } from "../../../../shared/interfaces/IStringableTokenizer";
import { RegExpTokenizer } from "../../../../shared/tokenizers/RegExpTokenizer";
import { Url } from "../model/Url";
import { EmailAddressValidator } from "../validators/EmailAddressValidator";
import { UrlValidator } from "../validators/UrlValidator";

export class UrlTokenizer extends RegExpTokenizer<Url>
  implements IStringableTokenizer<Url> {
  public validator = new UrlValidator();
  public entityFactory = (a) => new Url(a);
  public filter = (x) =>
    !new EmailAddressValidator().validate(x.entity.toString()); // Filter out email addresses
}
