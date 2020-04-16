import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

export class Syllable extends TokenizableStringableEntity
  implements ITypeMarked {
  type = "syllable";
  accent?: boolean;

  constructor(init?: Partial<Syllable>) {
    super();
    Object.assign(this, init);
  }
}
