import { ITypeMarked } from "../../../../shared/interfaces/i-type-marked";
import { Sentence } from "./sentence";
import { StringableToken } from "../../../../shared/model/stringableToken";
import { Word } from "./word";

export class Text extends StringableToken implements ITypeMarked {
  type = 'text';
  string?: string;
  sentences?: Sentence[];
  words?: Word[];

  constructor(init?: Partial<Text>) {
    super();
    Object.assign(this, init);
  }
}
