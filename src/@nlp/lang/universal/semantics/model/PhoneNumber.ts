import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

export class PhoneNumber extends TokenizableStringableEntity
  implements ITypeMarked {
  public type = "phone-number";

  public constructor(init?: Partial<PhoneNumber>) {
    super();
    Object.assign(this, init);
  }
}
