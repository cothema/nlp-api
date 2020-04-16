import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

/**
 * See: https://en.wikipedia.org/wiki/Phone_(phonetics)
 * Can be only lowercase
 */
export class Phone extends TokenizableStringableEntity implements ITypeMarked {
  type = "phone";

  constructor(init?: Partial<Phone>) {
    super();
    Object.assign(this, init);
  }
}
