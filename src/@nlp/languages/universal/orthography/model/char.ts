import { ITypeMarked } from "../../../../interface/i-type-marked";
import { Stringable } from "./stringable";

/**
 * Single character from alphabet. Can be uppercase or lowercase.
 */
export class Char extends Stringable implements ITypeMarked {
  type = 'char';
  string?: string;

  constructor(init?: Partial<Char>) {
    super();
    Object.assign(this, init);
  }
}
