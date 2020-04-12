import { IStringableEditableToken } from "../../../../shared/interfaces/IStringableEditableToken";
import { SentenceModality } from "../../semantics/enums/sentence-modality";
import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { StringableEntity } from "../../../../shared/model/StringableEntity";
import { Word } from "./word";

export class Sentence extends TokenizableStringEntity implements ITypeMarked, IStringableEditableToken {
  type = 'sentence';
  string: string;
  sentenceType: SentenceModality;
  words: Word[];

  constructor(init?: Partial<Sentence>) {
    super();
    Object.assign(this, init);
  }
}
