import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { StringableEntity } from "../../../../shared/model/StringableEntity";

export class Url extends StringableEntity implements ITypeMarked {
  type = "email-address";

  constructor(init?: Partial<Url>) {
    super();
    Object.assign(this, init);
  }
}
