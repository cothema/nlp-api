import { RegExpValidator } from "../../../../shared/tokenizers/RegExpValidator";

export class PhoneNumberValidator extends RegExpValidator {
  public regExp = /([+]?\d{1,3}[ \s]?)?(\d{9}?)/g;
}
