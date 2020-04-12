import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { StringableEntity } from "../../../../shared/model/StringableEntity";

export class Consonant extends StringableEntity implements ITypeMarked {
  type = "consonant";

  constructor(init?: Partial<Consonant>) {
    super();
    Object.assign(this, init);
  }
}
