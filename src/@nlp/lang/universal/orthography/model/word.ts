import { ITypeMarked } from "../../../../shared/interfaces/i-type-marked";
import { StringableToken } from "../../../../shared/model/stringableToken";

export class Word extends StringableToken implements ITypeMarked {
  type = 'word';
  string?: string;
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
