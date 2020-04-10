import { ITypeMarked } from "../../../../interface/i-type-marked";
import { Sentence } from "./sentence";
import { Stringable } from "./stringable";
import { Word } from "./word";

export class Text extends Stringable implements ITypeMarked {
  type = 'text';
  string?: string;
  sentences?: Sentence[];
  words?: Word[];

  constructor(init?: Partial<Text>) {
    super();
    Object.assign(this, init);
  }
}
