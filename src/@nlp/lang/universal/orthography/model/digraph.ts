import { ITypeMarked } from "../../../../shared/interfaces/i-type-marked";
import { StringableToken } from "../../../../shared/model/stringableToken";

/**
 * See: https://en.wikipedia.org/wiki/Digraph_(orthography)
 * E.g. CZ: ch, SK: dz / dž / ch
 */
export class Digraph extends StringableToken implements ITypeMarked {
  type = 'digraph';
  string?: string;

  constructor(init?: Partial<Digraph>) {
    super();
    Object.assign(this, init);
  }
}
