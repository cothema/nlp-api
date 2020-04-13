import { ITypeMarked } from "../../../../shared/interfaces/ITypeMarked";
import { StringableEntity } from "../../../../shared/model/StringableEntity";
import { Sentence } from "./Sentence";
import { Word } from "./Word";

export class Text extends StringableEntity implements ITypeMarked {
  public type = "text";
  public sentences?: Sentence[];
  public words?: Word[];

  public constructor(init?: Partial<Text>) {
    super();
    Object.assign(this, init);
  }
}
