import { IRegExpValidator } from "../interfaces/IRegExpValidator";
import { IStringable } from "../interfaces/IStringable";
import { IStringableTokenizer } from "../interfaces/IStringableTokenizer";
import { Token } from "../model/Token";
import { TokenizableStringableEntity } from "../model/TokenizableStringableEntity";
import { StringableTokenizer } from "./StringableTokenizer";

export class RegExpTokenizer<T extends TokenizableStringableEntity = TokenizableStringableEntity>
  extends StringableTokenizer<T>
  implements IStringableTokenizer<T> {

  validator: IRegExpValidator;

  tokenize(input: IStringable): Token<T>[] {
    let outputs: Array<Token<T>> = [];
    let match: RegExpExecArray;
    while ((match = this.validator.regExp.exec(input.toString())) != null) {
      outputs.push(
        new Token<T>(
          {
            index: match.index,
            length: match[0].length,
            entity: this.entityFactory({
              string: match[0],
            }) as T,
          },
        ),
      );
    }

    if (this.filter) {
      outputs = outputs.filter(this.filter);
    }

    return outputs;
  }

}
