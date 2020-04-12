import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { StringableEntity } from "../../../../shared/model/StringableEntity";

export class PhoneNumber extends StringableEntity implements ITypeMarked {
  type = "phone-number";

  constructor(init?: Partial<PhoneNumber>) {
    super();
    Object.assign(this, init);
  }
}
