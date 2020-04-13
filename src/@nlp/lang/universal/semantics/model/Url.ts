import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

export class Url extends TokenizableStringableEntity implements ITypeMarked {
  public type = "email-address";

  public constructor(init?: Partial<Url>) {
    super();
    Object.assign(this, init);
  }
}
