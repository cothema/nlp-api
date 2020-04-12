import { IStringableTokenizer } from "../../../../shared/interfaces/IStringableTokenizer";
import { RegExpTokenizer } from "../../../../shared/tokenizers/RegExpTokenizer";
import { EmailAddress } from "../model/email-address";
import { EmailAddressValidator } from "../validators/email-address-validator";

export class EmailAddressTokenizer
  extends RegExpTokenizer<EmailAddress>
  implements IStringableTokenizer<EmailAddress> {

  validator = new EmailAddressValidator();
  entityFactory = a => new EmailAddress(a);

}
