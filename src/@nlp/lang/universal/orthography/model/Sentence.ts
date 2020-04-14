import { IClonable } from "../../../../shared/interfaces/IClonable";
import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";
import { SentenceModality } from "../../semantics/enums/SentenceModality";

export class Sentence extends TokenizableStringableEntity
  implements ITypeMarked, IClonable {
  public type = "sentence";
  public string: string;
  public sentenceType: SentenceModality;

  public constructor(init?: Partial<Sentence>) {
    super();
    Object.assign(this, init);
  }
}
