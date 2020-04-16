import { ModifiableToken } from "../../../../shared/model/ModifiableToken";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";
import { LexicologyErrorType } from "../enums/LexicologyErrorType";
import { LexicologyError } from "../model/LexicologyError";

export abstract class AbstractLexicologyCorrector<
  T extends TokenizableStringableEntity = TokenizableStringableEntity
> {
  errors: LexicologyError[] = [];
  provideTokenInfo = true;

  constructor(public entity: T) {}

  abstract fixAll(): this;

  getEntity(): T {
    return this.entity;
  }

  protected fixByMultipleRegExps(
    matchRegExps: { regExp: RegExp; replace?: string }[],
    lexicologyError: LexicologyErrorType = LexicologyErrorType.UNSPECIFIED,
  ): this {
    for (const matchRegExp of matchRegExps) {
      this.fixByRegExp(
        matchRegExp.regExp,
        matchRegExp.replace || "",
        lexicologyError,
      );
    }
    return this;
  }

  protected fixByRegExp(
    matchRegExp: RegExp,
    replaceWith: string = "",
    lexicologyError: LexicologyErrorType = LexicologyErrorType.UNSPECIFIED,
  ): this {
    const str: string = this.entity
      .toString()
      .replace(matchRegExp, replaceWith);

    let match: RegExpExecArray;
    while ((match = matchRegExp.exec(this.entity.toString()))) {
      const tokenInfo = new ModifiableToken<T>({
        originalLength: match[0].length,
        originalIndex: match.index,
        origLength: replaceWith.length,
        origIndex: match.index,
      });

      this.fixInOriginal(str, lexicologyError, tokenInfo);
    }

    return this;
  }

  protected fixInOriginal(
    newString: string,
    error: LexicologyErrorType,
    tokenInfo?: ModifiableToken<T>,
  ): this {
    if (this.entity.toString() !== newString) {
      // There were some corrections.
      this.entity.string = newString;

      const lexicologyError = new LexicologyError({
        type: error,
        fixed: true,
      });
      if (tokenInfo && this.provideTokenInfo) {
        lexicologyError.tokenInfo = tokenInfo;
      }
      this.errors.push(lexicologyError);
    }

    // No changes or this.fixInOriginalString is true
    return this;
  }
}
