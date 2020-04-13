import { Token } from "../model/Token";
import { TokenizableStringableEntity } from "../model/TokenizableStringableEntity";
import { IStringable } from "./IStringable";

export interface IStringableTokenizer<
  Entity extends TokenizableStringableEntity
> {
  tokenize(input: IStringable): Token<Entity>[];

  tokenizeToEntities(input: IStringable): Entity[];

  tokenizeToValues(input: IStringable): string[];
}
