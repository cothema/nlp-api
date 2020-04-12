import { ModifiableToken } from "./ModifiableToken";
import { StringableEntity } from "./StringableEntity";

export class TokenizableStringableEntity extends StringableEntity {
  tokenInfoList: ModifiableToken<this>[];

  addToken(
    tokenInfo: ModifiableToken<this>,
  ) {
    this.tokenInfoList.push(tokenInfo);
  }

  getTokens(): ModifiableToken<this>[] {
    return this.tokenInfoList;
  }
}
