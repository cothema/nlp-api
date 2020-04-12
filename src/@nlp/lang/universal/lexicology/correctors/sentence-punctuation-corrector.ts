import { ModifiableToken } from "../../../../shared/model/ModifiableToken";
import { Sentence } from "../../orthography/model/Sentence";
import { LexicologyErrorType } from "../enums/lexicology-error-type";
import { AbstractLexicologyCorrector } from "./abstract-lexicology-corrector";

export class SentencePunctuationCorrector extends AbstractLexicologyCorrector<Sentence> {

  fixAll(): this {
    this.fixLeftExtraWhitespace();
    this.fixInvalidEndPunctuation();
    this.fixFirstLetterUpper();
    this.fixRightExtraWhitespace();
    this.fixMultipleWhitespace();
    this.fixMissingEndPunctuation();
    return this;
  }

  fixLeftExtraWhitespace(): this {
    const matchRegExp = /^\s+/g;

    return this.fixByRegExp(
      matchRegExp,
      "",
      LexicologyErrorType.EXTRA_WHITESPACE,
    );
  }

  fixRightExtraWhitespace(): this {
    const matchRegExp = /\s+$/g;

    return this.fixByRegExp(
      matchRegExp,
      "",
      LexicologyErrorType.EXTRA_WHITESPACE,
    );
  }

  fixMultipleWhitespace(): this {
    const matchRegExp = /[ ]+$/g;

    return this.fixByRegExp(
      matchRegExp,
      " ",
      LexicologyErrorType.EXTRA_WHITESPACE,
    );
  }

  fixInvalidEndPunctuation(): this {
    const matchRegExps = [
      { regExp: /\s*\.{2,}$/g, replace: "…" },
      { regExp: /\?{2,}$/g, replace: "?" },
      { regExp: /!{2,}$/g, replace: "!" },
    ];

    return this.fixByMultipleRegExps(
      matchRegExps,
      LexicologyErrorType.END_PUNCTUATION_INVALID,
    );
  }

  fixFirstLetterUpper(): this {
    const str: string = this.entity.toString()
      .charAt(0).toUpperCase() + this.entity.toString().slice(1);

    let tokenInfo: ModifiableToken;

    if (this.provideTokenInfo) {
      tokenInfo = new ModifiableToken({
        originalLength: 1,
        originalIndex: 0,
        newIndex: 0,
        newLength: 1,
      });
    }

    return this.fixInOriginalIfAllowed(
      str,
      LexicologyErrorType.FIRST_LETTER_NOT_UPPER,
      tokenInfo,
    );
  }

  fixMissingEndPunctuation(): this {
    let str = this.entity.toString();
    let tokenInfo: ModifiableToken;

    if (
      ![".", "?", "!", "…"].includes(
        str.charAt(str.length - 1),
      )
    ) {
      str += ".";
      if (this.provideTokenInfo) {
        tokenInfo = new ModifiableToken({
          originalLength: 0,
          originalIndex: str.length - 1,
          newIndex: str.length - 1,
          newLength: 1,
        });
      }
    }

    return this.fixInOriginalIfAllowed(
      str,
      LexicologyErrorType.END_PUNCTUATION_MISSING,
      tokenInfo,
    );
  }

}
