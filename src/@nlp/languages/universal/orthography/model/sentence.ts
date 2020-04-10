import { SentenceType } from "../../../../enums/sentence-types";
import { ITypeMarked } from "../../../../interface/i-type-marked";
import { Stringable } from "./stringable";
import { Word } from "./word";

export class Sentence extends Stringable implements ITypeMarked {
  type = 'sentence';
  string: string;
  sentenceType: SentenceType;
  words: Word[];

  constructor(init?: Partial<Sentence>) {
    super();
    Object.assign(this, init);
  }
}
