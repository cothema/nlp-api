import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

export class Url extends TokenizableStringableEntity implements ITypeMarked {
  type = "email-address";

  constructor(init?: Partial<Url>) {
    super();
    Object.assign(this, init);
  }
}
