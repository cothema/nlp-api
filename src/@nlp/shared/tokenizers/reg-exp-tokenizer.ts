import { IRegExpValidator } from "../interfaces/i-reg-exp-validator";
import { IStringable } from "../interfaces/i-stringable";
import { IToken } from "../interfaces/i-token";
import { ITokenizer } from "../interfaces/i-tokenizer";
import { StringableToken } from "../model/stringableToken";
import { TokenInfo } from "../model/token-info";

export class RegExpTokenizer implements ITokenizer<IToken & IStringable> {

  validator: IRegExpValidator;

  tokenize(input: IStringable): Array<IToken & IStringable> {
    const outputs: Array<IToken & IStringable> = [];
    let match: RegExpExecArray;
    while ((match = this.validator.regExp.exec(input.toString())) != null) {
      outputs.push(new StringableToken({
        string: match[0],
        tokenInfo: new TokenInfo({
          originalIndex: match.index,
          originalLength: match[0].length,
        }),
      }));
    }

    return outputs;
  }
}
