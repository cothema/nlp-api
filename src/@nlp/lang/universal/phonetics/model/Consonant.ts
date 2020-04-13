import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

export class Consonant extends TokenizableStringableEntity
  implements ITypeMarked {
  public type = "consonant";

  public constructor(init?: Partial<Consonant>) {
    super();
    Object.assign(this, init);
  }
}
