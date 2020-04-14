import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

/**
 * See: https://en.wikipedia.org/wiki/Digraph_(orthography)
 * E.g. CZ: ch, SK: dz / dž / ch
 */
export class Digraph extends TokenizableStringableEntity
  implements ITypeMarked {
  public type = "digraph";

  public constructor(init?: Partial<Digraph>) {
    super();
    Object.assign(this, init);
  }
}
