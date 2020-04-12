import { IRegExpValidator } from "../interfaces/IRegExpValidator";
import { IStringable } from "../interfaces/IStringable";
import { IStringableTokenizer } from "../interfaces/IStringableTokenizer";
import { IValidator } from "../interfaces/IValidator";
import { StringableEntity } from "../model/StringableEntity";
import { Token } from "../model/Token";

export abstract class StringableTokenizer<T extends StringableEntity = StringableEntity>
  implements IStringableTokenizer<T> {

  validator: IValidator;
  entityFactory: (a: Partial<StringableEntity>) => StringableEntity = a => new StringableEntity(a);
  filter: (e: Token<T>) => boolean;

  abstract tokenize(input: IStringable): Array<Token<T>>;

  tokenizeToEntities(input: IStringable): Array<T> {
    return this.tokenize(input).map(x => x.entity);
  }

  tokenizeToValues(input: IStringable): string[] {
    return this.tokenize(input).map(x => x.entity.toString());
  }
}
