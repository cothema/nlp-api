import { IStringable } from "../interfaces/IStringable";
import { IStringableTokenizer } from "../interfaces/IStringableTokenizer";
import { IValidator } from "../interfaces/IValidator";
import { Token } from "../model/Token";
import { TokenizableStringableEntity } from "../model/TokenizableStringableEntity";

export abstract class StringableTokenizer<
  T extends TokenizableStringableEntity = TokenizableStringableEntity
> implements IStringableTokenizer<T> {
  validator: IValidator;
  filter: (e: Token<T>) => boolean;

  entityFactory: (
    a: Partial<TokenizableStringableEntity>,
  ) => TokenizableStringableEntity = (a) => new TokenizableStringableEntity(a);

  abstract tokenize(input: IStringable): Token<T>[];

  tokenizeToEntities(input: IStringable): T[] {
    return this.tokenize(input).map((x) => x.fragment);
  }

  tokenizeToOriginalValues(input: IStringable): string[] {
    return this.tokenize(input).map((x) =>
      x.orig
        .slice(x.origIndex, x.origIndex + x.origLength)
        .map((orig) => orig.toString())
        .join(""),
    );
  }

  tokenizeToValues(input: IStringable): string[] {
    return this.tokenize(input).map((x) => x.fragment.toString());
  }
}
