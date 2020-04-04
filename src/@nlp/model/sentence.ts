import { SentenceType } from "../enums/sentence-types";
import { Word } from "./word";

export class Sentence {
  sentenceType: SentenceType;
  words: Word[];

  constructor(public text: string) {
  }
}
