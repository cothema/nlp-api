import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

export class Vowel extends TokenizableStringableEntity implements ITypeMarked {
  type = "vowel";

  constructor(init?: Partial<Vowel>) {
    super();
    Object.assign(this, init);
  }
}
