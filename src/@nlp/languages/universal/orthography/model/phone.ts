import { ITypeMarked } from "../../../../interface/i-type-marked";
import { Stringable } from "./stringable";

/**
 * See: https://en.wikipedia.org/wiki/Phone_(phonetics)
 * Can be only lowercase
 */
export class Phone extends Stringable implements ITypeMarked {
  type = 'phone';
  string?: string;

  constructor(init?: Partial<Phone>) {
    super();
    Object.assign(this, init);
  }
}
