import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

export class Diphthong
  extends TokenizableStringableEntity
  implements ITypeMarked {
  type = "diphthong";

  constructor(init?: Partial<Diphthong>) {
    super();
    Object.assign(this, init);
  }

}
