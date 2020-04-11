import { ITypeMarked } from "../../../../shared/interfaces/i-type-marked";
import { StringableToken } from "../../../../shared/model/stringableToken";

/**
 * Single character from alphabet. Can be uppercase or lowercase.
 */
export class Char extends StringableToken implements ITypeMarked {
  type = 'char';
  string?: string;

  constructor(init?: Partial<Char>) {
    super();
    Object.assign(this, init);
  }
}
