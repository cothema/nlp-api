import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { StringableEntity } from "../../../../shared/model/StringableEntity";

/**
 * See: https://en.wikipedia.org/wiki/Phone_(phonetics)
 * Can be only lowercase
 */
export class Phone extends StringableEntity implements ITypeMarked {
  type = 'phone';

  constructor(init?: Partial<Phone>) {
    super();
    Object.assign(this, init);
  }
}
