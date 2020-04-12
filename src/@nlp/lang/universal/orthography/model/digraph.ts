import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { StringableEntity } from "../../../../shared/model/StringableEntity";

/**
 * See: https://en.wikipedia.org/wiki/Digraph_(orthography)
 * E.g. CZ: ch, SK: dz / dž / ch
 */
export class Digraph extends StringableEntity implements ITypeMarked {
  type = 'digraph';

  constructor(init?: Partial<Digraph>) {
    super();
    Object.assign(this, init);
  }
}
