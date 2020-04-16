import { ModifiableToken } from "../../../../shared/model/ModifiableToken";
import { Sentence } from "../../orthography/model/Sentence";
import { LexicologyErrorType } from "../enums/LexicologyErrorType";
import { AbstractLexicologyCorrector } from "./AbstractLexicologyCorrector";

export class SentencePunctuationCorrector extends AbstractLexicologyCorrector<
  Sentence
> {
  fixAll(): this {
    // Fix extra space
    this.fixLeftExtraWhitespace()
      .fixRightExtraWhitespace()
      .fixMultipleWhitespace()
      .fixWhitespaceBeforeEndPunctuation();

    // Fix punctuation
    this.fixInvalidEndPunctuation().fixMissingEndPunctuation();

    // Fix letters
    this.fixFirstLetterUpper();

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

  fixWhitespaceBeforeEndPunctuation(): this {
    const matchRegExp = /[ ]+(?=[\.\?!…])/g;

    return this.fixByRegExp(
      matchRegExp,
      "",
      LexicologyErrorType.EXTRA_WHITESPACE,
    );
  }

  fixInvalidEndPunctuation(): this {
    const matchRegExps = [
      { regExp: /\.{2,}$/g, replace: "…" },
      { regExp: /\?{2,}$/g, replace: "?" },
      { regExp: /!{2,}$/g, replace: "!" },
    ];

    return this.fixByMultipleRegExps(
      matchRegExps,
      LexicologyErrorType.END_PUNCTUATION_INVALID,
    );
  }

  fixFirstLetterUpper(): this {
    const str: string =
      this.entity.toString().charAt(0).toUpperCase() +
      this.entity.toString().slice(1);

    let tokenInfo: ModifiableToken<Sentence>;

    if (this.provideTokenInfo) {
      tokenInfo = new ModifiableToken({
        originalLength: 1,
        originalIndex: 0,
        origIndex: 0,
        origLength: 1,
      });
    }

    return this.fixInOriginal(
      str,
      LexicologyErrorType.FIRST_LETTER_NOT_UPPER,
      tokenInfo,
    );
  }

  fixMissingEndPunctuation(): this {
    let str = this.entity.toString();
    let tokenInfo: ModifiableToken<Sentence>;

    if (![".", "?", "!", "…"].includes(str.charAt(str.length - 1))) {
      str += ".";
      if (this.provideTokenInfo) {
        tokenInfo = new ModifiableToken({
          originalLength: 0,
          originalIndex: str.length - 1,
          origIndex: str.length - 1,
          origLength: 1,
        });
      }
    }

    return this.fixInOriginal(
      str,
      LexicologyErrorType.END_PUNCTUATION_MISSING,
      tokenInfo,
    );
  }
}
