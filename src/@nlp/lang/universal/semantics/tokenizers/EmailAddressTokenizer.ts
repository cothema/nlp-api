import { IStringableTokenizer } from "../../../../shared/interfaces/IStringableTokenizer";
import { RegExpTokenizer } from "../../../../shared/tokenizers/RegExpTokenizer";
import { EmailAddress } from "../model/EmailAddress";
import { EmailAddressValidator } from "../validators/EmailAddressValidator";

export class EmailAddressTokenizer extends RegExpTokenizer<EmailAddress>
  implements IStringableTokenizer<EmailAddress> {
  public validator = new EmailAddressValidator();
  public entityFactory = (a) => new EmailAddress(a);
}
