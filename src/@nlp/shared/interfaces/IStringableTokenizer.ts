import { Token } from "../model/Token";
import { IStringable } from "./IStringable";

export interface IStringableTokenizer<Entity, Input = IStringable> {
  tokenize(input: Input): Token<Entity>[];

  tokenizeToEntities(input: IStringable): Entity[];

  tokenizeToValues(input: IStringable): string[];
}
