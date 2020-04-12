import { IRegExpValidator } from "../interfaces/IRegExpValidator";
import { IStringable } from "../interfaces/IStringable";
import { IStringableTokenizer } from "../interfaces/IStringableTokenizer";
import { StringableEntity } from "../model/StringableEntity";
import { Token } from "../model/Token";
import { StringableTokenizer } from "./StringableTokenizer";

export class RegExpTokenizer<T extends StringableEntity = StringableEntity>
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
