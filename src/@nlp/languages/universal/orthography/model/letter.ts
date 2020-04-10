import { ITypeMarked } from "../../../../interface/i-type-marked";
import { Stringable } from "./stringable";

/**
 * Similar to Char, but includes e.g. ch (ch is single letter that
 * consists of two chars).
 */
export class Letter extends Stringable implements ITypeMarked {
  type = 'letter';
  string?: string;

  constructor(init?: Partial<Letter>) {
    super();
    Object.assign(this, init);
  }
}
