import { RegExpValidator } from "../../../../shared/tokenizers/RegExpValidator";

export class UrlValidator extends RegExpValidator {
  // https://stackoverflow.com/a/3809435/1044198
  public regExp = /((http:\/\/)|(https:\/\/))?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
}
