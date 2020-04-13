import { IStringableTokenizer } from "../../../../shared/interfaces/IStringableTokenizer";
import { RegExpTokenizer } from "../../../../shared/tokenizers/RegExpTokenizer";
import { Url } from "../model/Url";
import { EmailAddressValidator } from "../validators/EmailAddressValidator";
import { UrlValidator } from "../validators/UrlValidator";

export class UrlTokenizer
  extends RegExpTokenizer<Url>
  implements IStringableTokenizer<Url> {

  validator = new UrlValidator();
  entityFactory = a => new Url(a);
  filter = x => !(new EmailAddressValidator().validate(x.entity.toString())); // Filter out email addresses

}
