import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

/**
 * Stem of the word (e.g. cz: stav for výstavní)
 */
export class WordStem extends TokenizableStringableEntity
  implements ITypeMarked {
  public type = "word-stem";

  public constructor(init?: Partial<WordStem>) {
    super();
    Object.assign(this, init);
  }
}
