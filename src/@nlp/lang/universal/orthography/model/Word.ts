import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { StringableEntity } from "../../../../shared/model/StringableEntity";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";

export class Word
  extends TokenizableStringableEntity
  implements ITypeMarked {
  type = 'word';
  tags?: {
    type: string,
    tagType: string,
    probability: number,
  }[];
  pronunciation?: string;

  constructor(init?: Partial<Word>) {
    super();
    Object.assign(this, init);
  }
}
