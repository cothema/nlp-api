import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { StringableEntity } from "../../../../shared/model/StringableEntity";

export class Word extends StringableEntity implements ITypeMarked {
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
