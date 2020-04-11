import { SentenceModality } from "../../semantics/enums/sentence-modality";
import { ITypeMarked } from "../../../../shared/interfaces/i-type-marked";
import { StringableToken } from "../../../../shared/model/stringableToken";
import { Word } from "./word";

export class Sentence extends StringableToken implements ITypeMarked {
  type = 'sentence';
  string: string;
  sentenceType: SentenceModality;
  words: Word[];

  constructor(init?: Partial<Sentence>) {
    super();
    Object.assign(this, init);
  }
}
