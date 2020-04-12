import { IClonable } from "../interfaces/IClonable";
import { ModifiableToken } from "./ModifiableToken";
import { StringableEntity } from "./StringableEntity";

export class TokenizableStringableEntity
  extends StringableEntity
  implements IClonable {
  tokenInfoList: ModifiableToken<this>[];

  constructor(init?: Partial<TokenizableStringableEntity>) {
    super();
    Object.assign(this, init);
  }

  /**
   * Be careful, bacause non trivial datatypes will remain as pointers if
   * they will not be cloned manually!
   */
  clone(): this {
    let clone = new TokenizableStringableEntity(this);
    clone.tokenInfoList = [];
    for (const tokenInfoListElement of this.tokenInfoList) {
      clone.tokenInfoList.push(
        new ModifiableToken({
          index: tokenInfoListElement.index,
          length: tokenInfoListElement.length,
          entity: clone,
        }),
      );
    }
    return clone as this;
  }
}
