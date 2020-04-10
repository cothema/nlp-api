import { ITypeMarked } from "../../../../interface/i-type-marked";
import { Stringable } from "./stringable";

/**
 * See: https://en.wikipedia.org/wiki/Digraph_(orthography)
 * E.g. CZ: ch, SK: dz / dž / ch
 */
export class Digraph extends Stringable implements ITypeMarked {
  type = 'digraph';
  string?: string;

  constructor(init?: Partial<Digraph>) {
    super();
    Object.assign(this, init);
  }
}
