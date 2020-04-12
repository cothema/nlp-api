import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { StringableEntity } from "../../../../shared/model/StringableEntity";

/**
 * Single character from alphabet. Can be uppercase or lowercase.
 */
export class Char extends StringableEntity implements ITypeMarked {
  type = 'char';

  constructor(init?: Partial<Char>) {
    super();
    Object.assign(this, init);
  }
}
