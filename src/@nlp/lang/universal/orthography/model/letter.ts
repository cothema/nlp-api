import { ITypeMarked } from "../../../../shared/interfaces/i-type-marked";
import { StringableToken } from "../../../../shared/model/stringableToken";

/**
 * Similar to Char, but includes e.g. ch (ch is single letter that
 * consists of two chars).
 */
export class Letter extends StringableToken implements ITypeMarked {
  type = 'letter';
  string?: string;

  constructor(init?: Partial<Letter>) {
    super();
    Object.assign(this, init);
  }
}
