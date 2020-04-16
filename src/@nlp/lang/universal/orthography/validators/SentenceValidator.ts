import { RegExpValidator } from "../../../../shared/tokenizers/RegExpValidator";

export class SentenceValidator extends RegExpValidator {
  /**
   * Regular expression is used from NaturalNode/natural library from
   * Github.com: https://github.com/NaturalNode/natural
   * Original license: MIT
   */
  public regExp = /(?<=\s+|^)[\"\'\‘\“\'\"\[\(\{\⟨](.*?[.?!])(\s[.?!])*[\"\'\’\”\'\"\]\)\}\⟩](?=\s+|$)|(?<=\s+|^)\S(.*?[.?!])(\s[.?!])*(?=\s+|$)/g;
}
