import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

export class Syllable extends TokenizableStringableEntity
  implements ITypeMarked {
  public type = "syllable";
  public accent?: boolean;

  public constructor(init?: Partial<Syllable>) {
    super();
    Object.assign(this, init);
  }
}
