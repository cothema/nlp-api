import { ITypeMarked } from "../../../../interface/i-type-marked";
import { Stringable } from "./stringable";

/**
 * E.g. CZ: au, ou, eu
 */
export class Diphthong extends Stringable implements ITypeMarked {
  type = 'diphthong';
  string?: string;

  constructor(init?: Partial<Diphthong>) {
    super();
    Object.assign(this, init);
  }
}
