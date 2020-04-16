import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

export class PhoneNumber extends TokenizableStringableEntity
  implements ITypeMarked {
  type = "phone-number";

  constructor(init?: Partial<PhoneNumber>) {
    super();
    Object.assign(this, init);
  }
}
