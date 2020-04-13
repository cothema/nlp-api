import { IRegExpValidator } from "../interfaces/IRegExpValidator";
import { IStringable } from "../interfaces/IStringable";
import { IStringableTokenizer } from "../interfaces/IStringableTokenizer";
import { IValidator } from "../interfaces/IValidator";
import { StringableEntity } from "../model/StringableEntity";
import { Token } from "../model/Token";
import { TokenizableStringableEntity } from "../model/TokenizableStringableEntity";

export abstract class StringableTokenizer<T extends TokenizableStringableEntity = TokenizableStringableEntity>
  implements IStringableTokenizer<T> {

  validator: IValidator;
  entityFactory: (a: Partial<TokenizableStringableEntity>) => TokenizableStringableEntity
    = a => new TokenizableStringableEntity(a);
  filter: (e: Token<T>) => boolean;

  abstract tokenize(input: IStringable): Array<Token<T>>;

  tokenizeToEntities(input: IStringable): Array<T> {
    return this.tokenize(input).map(x => x.entity);
  }

  tokenizeToValues(input: IStringable): string[] {
    return this.tokenize(input).map(x => x.entity.toString());
  }
}
