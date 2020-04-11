import { IStringable } from "../interfaces/i-stringable";
import { IToken } from "../interfaces/i-token";
import { ITypeMarked } from "../interfaces/i-type-marked";
import { TokenInfo } from "./token-info";

export class StringableToken implements IStringable, ITypeMarked, IToken {
  type = "unknown";
  string?: string;
  tokenInfo?: TokenInfo;

  constructor(init?: Partial<StringableToken>) {
    Object.assign(this, init);
  }

  toString(): string {
    return this.string;
  }
}
