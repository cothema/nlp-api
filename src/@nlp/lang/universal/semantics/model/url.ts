import { IToken } from "../../../../shared/interfaces/i-token";
import { ITypeMarked } from "../../../../shared/interfaces/i-type-marked";
import { TokenInfo } from "../../../../shared/model/token-info";
import { StringableToken } from "../../../../shared/model/stringableToken";

export class Url extends StringableToken implements ITypeMarked, IToken {
  type = "email-address";
  string?: string;
  tokenInfo?: TokenInfo;

  constructor(init?: Partial<Url>) {
    super();
    Object.assign(this, init);
  }
}
