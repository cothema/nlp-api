import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { StringableEntity } from "../../../../shared/model/StringableEntity";
import { Sentence } from "./Sentence";
import { Word } from "./Word";

export class Text extends StringableEntity implements ITypeMarked {
  type = "text";
  sentences?: Sentence[];
  words?: Word[];

  constructor(init?: Partial<Text>) {
    super();
    Object.assign(this, init);
  }
}
