import { ITypeMarked } from "../../../../shared/interfaces/i-type-marked";
import { StringableToken } from "../../../../shared/model/stringableToken";

/**
 * E.g. CZ: au, ou, eu
 */
export class Diphthong extends StringableToken implements ITypeMarked {
  type = 'diphthong';
  string?: string;

  constructor(init?: Partial<Diphthong>) {
    super();
    Object.assign(this, init);
  }
}
