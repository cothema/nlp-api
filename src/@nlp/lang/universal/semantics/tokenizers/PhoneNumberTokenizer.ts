import { IStringableTokenizer } from "../../../../shared/interfaces/IStringableTokenizer";
import { RegExpTokenizer } from "../../../../shared/tokenizers/RegExpTokenizer";
import { PhoneNumber } from "../model/phone-number";
import { PhoneNumberValidator } from "../validators/phone-number-validator";

export class PhoneNumberTokenizer
  extends RegExpTokenizer<PhoneNumber>
  implements IStringableTokenizer<PhoneNumber> {

  validator = new PhoneNumberValidator();
  entityFactory = a => new PhoneNumber(a);

}
