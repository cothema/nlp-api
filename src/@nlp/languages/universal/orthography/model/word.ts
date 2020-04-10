import { ITypeMarked } from "../../../../interface/i-type-marked";
import { Stringable } from "./stringable";

export class Word extends Stringable implements ITypeMarked {
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
