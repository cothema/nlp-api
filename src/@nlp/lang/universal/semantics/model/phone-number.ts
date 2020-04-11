import { IToken } from "../../../../shared/interfaces/i-token";
import { ITypeMarked } from "../../../../shared/interfaces/i-type-marked";
import { TokenInfo } from "../../../../shared/model/token-info";
import { StringableToken } from "../../../../shared/model/stringableToken";

export class PhoneNumber extends StringableToken implements ITypeMarked, IToken {
  type = "phone-number";
  string?: string;
  tokenInfo?: TokenInfo;

  constructor(init?: Partial<PhoneNumber>) {
    super();
    Object.assign(this, init);
  }
}
