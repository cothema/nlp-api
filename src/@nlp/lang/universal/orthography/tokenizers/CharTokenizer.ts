import { IStringable } from "../../../../shared/interfaces/IStringable";
import { IStringableTokenizer } from "../../../../shared/interfaces/IStringableTokenizer";
import { Token } from "../../../../shared/model/Token";
import { RegExpTokenizer } from "../../../../shared/tokenizers/RegExpTokenizer";
import { Char } from "../model/Char";

export class CharTokenizer extends RegExpTokenizer<Char>
  implements IStringableTokenizer<Char> {
  public tokenize(input: IStringable): Token<Char>[] {
    const out = [];
    const chars = Array.from(input.toString());
    for (let i = 0; chars[i]; i++) {
      // char = length = 1 (including utf-8 special chars)
      out.push(
        new Token({
          index: i,
          length: 1,
          entity: new Char({ string: chars[i] }),
        }),
      );
    }

    return out;
  }
}
