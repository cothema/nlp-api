import { RegExpValidator } from "../../../../shared/tokenizers/reg-exp-validator";

export class PhoneNumberValidator extends RegExpValidator {
  regExp = /([+]?\d{1,3}[ \s]?)?(\d{9}?)/g;
}
