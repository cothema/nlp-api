import { Token } from "../model/Token";
import { TokenizableStringableEntity } from "../model/TokenizableStringableEntity";
import { IStringable } from "./IStringable";

export interface IMetaTokenizer<
  Entity extends TokenizableStringableEntity
> {
  tokenize(input: IStringable): Token<Entity>[];

  tokenizeToEntities(input: IStringable): Entity[];

  tokenizeToValues(input: IStringable): string[];
}
