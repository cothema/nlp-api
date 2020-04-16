import { IStringable } from "../interfaces/IStringable";
import { IStringableTokenizer } from "../interfaces/IStringableTokenizer";
import { Token } from "../model/Token";
import { TokenizableStringableEntity } from "../model/TokenizableStringableEntity";
import { StringableTokenizer } from "./StringableTokenizer";

export class SplitRegExpTokenizer<
  T extends TokenizableStringableEntity = TokenizableStringableEntity
> extends StringableTokenizer<T> implements IStringableTokenizer<T> {
  splitRegExp: RegExp = /\.+/g;

  tokenize(input: IStringable): Token<T>[] {
    const outputs: Token<T>[] = [];
    let match: RegExpExecArray;

    let pointer = 0;
    while ((match = this.splitRegExp.exec(input.toString()))) {
      const positiveStringLength = match.index - pointer;
      const oldPointer = pointer;
      pointer += positiveStringLength + match[0].length;

      if (positiveStringLength <= 0) {
        continue;
      }
      const fragmentString = input
        .toString()
        .slice(oldPointer, oldPointer + positiveStringLength);

      outputs.push(
        new Token<T>({
          origIndex: oldPointer,
          origLength: positiveStringLength,
          fragment: this.entityFactory({
            string: fragmentString,
          }) as T,
        }),
      );
    }

    // append last word if no delimiter is at the end.
    if (pointer < input.toString().length) {
      const fragmentString = input
        .toString()
        .slice(pointer, input.toString().length);
      const positiveStringLength = input.toString().length - pointer;
      outputs.push(
        new Token<T>({
          origIndex: pointer,
          origLength: positiveStringLength,
          fragment: this.entityFactory({
            string: fragmentString,
          }) as T,
        }),
      );
    }

    return outputs;
  }
}
