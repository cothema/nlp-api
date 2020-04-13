import { IStringableTokenizer } from "../../../../shared/interfaces/IStringableTokenizer";
import { RegExpTokenizer } from "../../../../shared/tokenizers/RegExpTokenizer";
import { PhoneNumber } from "../model/PhoneNumber";
import { PhoneNumberValidator } from "../validators/PhoneNumberValidator";

export class PhoneNumberTokenizer
  extends RegExpTokenizer<PhoneNumber>
  implements IStringableTokenizer<PhoneNumber> {

  validator = new PhoneNumberValidator();
  entityFactory = a => new PhoneNumber(a);

}
