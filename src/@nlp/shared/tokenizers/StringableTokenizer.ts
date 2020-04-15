import { IStringable } from "../interfaces/IStringable";
import { IStringableTokenizer } from "../interfaces/IStringableTokenizer";
import { IValidator } from "../interfaces/IValidator";
import { Token } from "../model/Token";
import { TokenizableStringableEntity } from "../model/TokenizableStringableEntity";

export abstract class StringableTokenizer<
  T extends TokenizableStringableEntity = TokenizableStringableEntity
> implements IStringableTokenizer<T> {
  public validator: IValidator;
  public filter: (e: Token<T>) => boolean;

  public entityFactory: (
    a: Partial<TokenizableStringableEntity>,
  ) => TokenizableStringableEntity = (a) => new TokenizableStringableEntity(a);

  public abstract tokenize(input: IStringable): Token<T>[];

  public tokenizeToEntities(input: IStringable): T[] {
    return this.tokenize(input).map((x) => x.fragment);
  }

  public tokenizeToOriginalValues(input: IStringable): string[] {
    return this.tokenize(input).map((x) =>
      x.orig
        .slice(x.origIndex, x.origIndex + x.origLength)
        .map((orig) => orig.toString())
        .join(""),
    );
  }

  public tokenizeToValues(input: IStringable): string[] {
    return this.tokenize(input).map((x) => x.fragment.toString());
  }
}
