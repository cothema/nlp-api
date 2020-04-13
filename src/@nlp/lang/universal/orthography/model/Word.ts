import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

export class Word extends TokenizableStringableEntity implements ITypeMarked {
  public type = "word";
  public tags?: {
    type: string;
    tagType: string;
    probability: number;
  }[];
  public pronunciation?: string;

  public constructor(init?: Partial<Word>) {
    super();
    Object.assign(this, init);
  }
}
