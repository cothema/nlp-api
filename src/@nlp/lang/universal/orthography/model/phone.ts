import { ITypeMarked } from "../../../../shared/interfaces/i-type-marked";
import { StringableToken } from "../../../../shared/model/stringableToken";

/**
 * See: https://en.wikipedia.org/wiki/Phone_(phonetics)
 * Can be only lowercase
 */
export class Phone extends StringableToken implements ITypeMarked {
  type = 'phone';
  string?: string;

  constructor(init?: Partial<Phone>) {
    super();
    Object.assign(this, init);
  }
}
