import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

/**
 * Single character from alphabet. Can be uppercase or lowercase.
 */
export class Char extends TokenizableStringableEntity implements ITypeMarked {
  type = "char";

  constructor(init?: Partial<Char>) {
    super();
    Object.assign(this, init);
  }
}
