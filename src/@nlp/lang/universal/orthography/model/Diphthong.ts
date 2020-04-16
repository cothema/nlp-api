import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { StringableEntity } from "../../../../shared/model/StringableEntity";

/**
 * E.g. CZ: au, ou, eu
 */
export class Diphthong extends StringableEntity implements ITypeMarked {
  type = "diphthong";

  constructor(init?: Partial<Diphthong>) {
    super();
    Object.assign(this, init);
  }
}
