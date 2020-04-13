import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { Sentence } from "./Sentence";
import { StringableEntity } from "../../../../shared/model/StringableEntity";
import { Word } from "./Word";

export class Text extends StringableEntity implements ITypeMarked {
  type = 'text';
  sentences?: Sentence[];
  words?: Word[];

  constructor(init?: Partial<Text>) {
    super();
    Object.assign(this, init);
  }
}