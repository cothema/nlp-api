import { RegExpValidator } from "../../../../shared/tokenizers/reg-exp-validator";

export class UrlValidator extends RegExpValidator {
  // https://stackoverflow.com/a/3809435/1044198
  regExp = /((http:\/\/)|(https:\/\/))?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
}
