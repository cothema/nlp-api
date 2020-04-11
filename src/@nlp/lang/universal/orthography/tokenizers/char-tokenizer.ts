import { IStringable } from "../../../../shared/interfaces/i-stringable";
import { Char } from "../model/char";

export class CharTokenizer {
  tokenize(input: IStringable): Char[] {
    return Array.from(input.toString()).map(x => {
      return new Char({ string: x });
    });
  }
}
