import { Sentence } from "./sentence";
import { Word } from "./word";

export class Text {
  sentences: Sentence[];
  words: Word[];

  constructor(public text: string) {
  }

}
