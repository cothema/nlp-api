import { RegExpValidator } from "../../../../shared/tokenizers/RegExpValidator";

export class EmailAddressValidator extends RegExpValidator {
  // https://stackoverflow.com/questions/15140955/use-javascript-to-find-email-address-in-a-string
  public regExp = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;
}
