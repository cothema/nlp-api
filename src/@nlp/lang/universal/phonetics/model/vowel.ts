import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { StringableEntity } from "../../../../shared/model/StringableEntity";

/**
 *
 */
export class Vowel extends StringableEntity implements ITypeMarked {
  type = "vowel";

  constructor(init?: Partial<Vowel>) {
    super();
    Object.assign(this, init);
  }
}
