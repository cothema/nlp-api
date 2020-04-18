import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { TokenizableStringableEntity } from "../../../../shared/model/TokenizableStringableEntity";
import { LexicologyVerbalType } from "../../lexicology/enums/LexicologyVerbalType";

export class Word extends TokenizableStringableEntity implements ITypeMarked {
  type = "word";
  tags?: {
    type: string;
    tagType: string;
    probability: number;
  }[];
  pronunciation?: string;
  verbalType?: {
    type?: LexicologyVerbalType,
    lang?: string,
    probability?: number, // 0 - 1 (1 means 100%)
    details?: any,
  }[];

  constructor(init?: Partial<Word>) {
    super();
    Object.assign(this, init);
  }
}
