import { IRegExpValidator } from "../interfaces/IRegExpValidator";
import { IStringable } from "../interfaces/IStringable";
import { IStringableTokenizer } from "../interfaces/IStringableTokenizer";
import { Token } from "../model/Token";
import { TokenizableStringableEntity } from "../model/TokenizableStringableEntity";
import { StringableTokenizer } from "./StringableTokenizer";

export class RegExpTokenizer<
  T extends TokenizableStringableEntity = TokenizableStringableEntity
> extends StringableTokenizer<T> implements IStringableTokenizer<T> {
  public validator: IRegExpValidator;

  public tokenize(input: IStringable): Token<T>[] {
    let outputs: Token<T>[] = [];
    let match: RegExpExecArray;
    do {
      // Do-while is because of tslint error
      match = this.validator.regExp.exec(input.toString());
      if (!match) {
        break;
      }
      outputs.push(
        new Token<T>({
          index: match.index,
          length: match[0].length,
          entity: this.entityFactory({
            string: match[0],
          }) as T,
        }),
      );
    } while (match);

    if (this.filter) {
      outputs = outputs.filter(this.filter);
    }

    return outputs;
  }
}
